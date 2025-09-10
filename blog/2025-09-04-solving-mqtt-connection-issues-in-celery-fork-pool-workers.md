---
slug: solving-mqtt-connections-in-celery-fork-pool-workers
title: Mqtt connection management in Celery fork pool workers
authors: [meshin-dev]
tags: [
    "software-development", architecture, celery, mqtt, rabbitmq, threading, connections, python, multiprocessing, fork, sockets, "network-programming", "distributed-systems", message-broker, connection-pooling, thread-local, concurrency, parallelism, process-isolation, task-queue, broker, bugfix, troubleshooting, best-practices, performance, reliability, high-throughput, resource-management, "file-descriptors", debugging, code-smells, anti-patterns, python-tips, celery-tasks, mqtt-client, connection-management, "thread-safety", production, "distributed-computing"
]
---

# Solving MQTT Connection Issues in Celery Fork Pool Workers

## The Problem: When Module-Level MQTT Connections Go Wrong

Recently, I encountered a frustrating issue while working on a high-throughput data publishing system using Celery and MQTT. Our system was processing thousands of BLE (Bluetooth Low Energy) messages and publishing them to an MQTT broker. Everything worked fine initially, but after refactoring to improve code organization, messages stopped being delivered.

<!-- truncate -->

### What Changed?

Originally, our MQTT client was created inside the Celery task:

```python
@shared_task
def ble_message_publisher(self, data, devices, mqtt_topic, mqtt_qos=2):
    try:
        # MQTT client created inside the task
        mqtt = MqttClient()
        
        # ... publish messages ...
```

This worked but had a major drawback: it created a new MQTT connection for every task execution. With thousands of tasks, we were overwhelming the MQTT broker with connections.

To "optimize" this, I moved the MQTT client to module level:

```python
# At the top of the file
mqtt = MqttClient()

@shared_task
def ble_message_publisher(self, data, devices, mqtt_topic, mqtt_qos=2):
    try:
        # Use the module-level mqtt client
        mqtt.publish(...)
```

## The Symptoms

After this change, strange things started happening:

1. **No error messages**, but messages weren't being delivered
2. The MQTT client appeared to be "connected" but couldn't send data
3. Logs showed timeout errors like:

   ```
   [ERROR] Message not delivered within timeout for mid=502
   [ERROR] Message not delivered within timeout for mid=503
   ```

## Understanding the Root Cause

The issue stems from how Celery's fork pool workers operate:

### How Fork Works

1. **Parent Process**: When Celery starts, it imports your modules and creates the MQTT connection
2. **Fork Happens**: Celery creates child processes by forking the parent
3. **The Problem**: File descriptors (like network sockets) can't be shared between processes after a fork

Think of it like trying to share a phone call - you can't have multiple people talking on the same physical phone line at once!

### Visual Representation

```
Before Fork:
Parent Process
└── mqtt = MqttClient() [Connected to broker]

After Fork:
Parent Process                    Child Process 1              Child Process 2
└── mqtt [Original socket]       └── mqtt [Broken socket]    └── mqtt [Broken socket]
```

The child processes inherit a *copy* of the MQTT connection object, but the underlying socket is broken. The connection appears to exist but can't actually send data.

## The Solution: Thread-Local MQTT Clients

To solve this, I implemented a thread-local pattern that creates separate MQTT clients for each thread/process combination:

```python
import threading
from typing import Dict

# Instead of a single module-level client
_mqtt_clients: Dict[int, MqttClient] = {}
_mqtt_lock = threading.Lock()

def get_mqtt_client() -> MqttClient:
    """Get or create an MQTT client for current thread/process."""
    thread_id = threading.current_thread().ident

    with _mqtt_lock:
        if thread_id not in _mqtt_clients:
            logger.info(f"Creating new MQTT client for thread {thread_id}")
            _mqtt_clients[thread_id] = MqttClient()

        client = _mqtt_clients[thread_id]

        # Ensure connection is alive
        if not client.is_connected:
            logger.info(f"Reconnecting MQTT client for thread {thread_id}")
            client.reconnect()

        return client

@shared_task
def ble_message_publisher(self, data, devices, mqtt_topic, mqtt_qos=2):
    try:
        # Get thread-local client instead of using global
        mqtt = get_mqtt_client()
        
        # ... rest of the code ...
```

## Why This Works

### 1. Process Isolation

After forking, each child process has its own copy of the `_mqtt_clients` dictionary. When a task runs in a child process, it creates its own fresh MQTT connection instead of using the broken inherited one.

### 2. Connection Reuse

Within each process/thread, the MQTT client is reused across multiple task executions. This dramatically reduces the number of connections compared to creating a new one for each task.

### 3. Thread Safety

The `threading.Lock()` ensures that only one thread at a time can create or access clients in the dictionary, preventing race conditions.

## The Results

### Before (Module-level client)

- ❌ 0 successful messages out of 200
- ❌ All messages timing out
- ❌ Broken socket connections

### After (Thread-local pattern)

- ✅ Connection reuse within threads
- ✅ Fresh connections per process
- ✅ Stable message delivery
- ✅ Reduced load on MQTT broker

## Key Takeaways

1. **Be careful with module-level network connections** in forking environments like Celery
2. **File descriptors don't survive fork()** - this includes sockets, database connections, etc.
3. **Thread-local storage** is a great pattern for managing per-worker resources
4. **Always verify connections** before use, especially in long-running workers

## Implementation Tips

If you're facing similar issues:

1. **Check your worker pool type**: This issue specifically affects fork-based pools. Thread or gevent pools behave differently.

2. **Monitor connection counts**: Keep an eye on your MQTT broker's connection count to ensure you're not creating too many.

3. **Add connection health checks**: Always verify the connection is alive before using it:

   ```python
   if not client.is_connected:
       client.reconnect()
   ```

4. **Consider connection pooling**: For high-throughput systems, you might want to implement a proper connection pool with size limits.

5. **Log thread/process IDs**: This helps debug which worker is creating which connection:

   ```python
   logger.info(f"Creating new MQTT client for thread {thread_id}")
   ```

## Conclusion

Moving from task-level to module-level resources seems like an obvious optimization, but in forking environments, it can lead to subtle and hard-to-debug issues. The thread-local pattern provides a nice middle ground - avoiding the overhead of creating connections for every task while ensuring each worker has a valid, working connection.

Remember: when working with Celery and network connections, always consider how your code will behave after a fork!
