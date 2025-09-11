import { useEffect, useRef } from 'react';
import styles from './styles.module.css';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'service' | 'database' | 'api' | 'cache' | 'queue' | 'apiGateway' | 'restApi' | 'rpc' | 'kafka' | 'redis' | 'postgres';
  size: number;
  opacity: number;
  connections: number[];
  label: string;
  pulsePhase: number;
  dataFlowPhase: number;
}

interface DataPacket {
  from: number;
  to: number;
  progress: number;
  type: 'request' | 'response' | 'data';
  size: number;
}

const NODE_TYPES = {
  apiGateway: { 
    color: '#8e44ad', 
    width: 180, 
    height: 80, 
    shape: 'rectangle',
    cornerRadius: 12
  },
  restApi: { 
    color: '#9b59b6', 
    width: 140, 
    height: 70, 
    shape: 'rectangle',
    cornerRadius: 8
  },
  rpc: { 
    color: '#e74c3c', 
    width: 120, 
    height: 60, 
    shape: 'rectangle',
    cornerRadius: 6
  },
  service: { 
    color: '#00add8', 
    width: 160, 
    height: 100, 
    shape: 'rectangle',
    cornerRadius: 8
  },
  kafka: { 
    color: '#2ecc71', 
    width: 140, 
    height: 80, 
    shape: 'rectangle',
    cornerRadius: 20
  },
  redis: { 
    color: '#e67e22', 
    width: 100, 
    height: 100, 
    shape: 'diamond',
    cornerRadius: 0
  },
  postgres: { 
    color: '#ffd43b', 
    width: 140, 
    height: 140, 
    shape: 'cylinder',
    cornerRadius: 70
  }
};

// Define realistic payment gateway connection rules
const CONNECTION_RULES = {
  apiGateway: ['restApi', 'rpc'], // API Gateway routes to REST API and RPC
  restApi: ['service', 'redis', 'postgres'], // REST API connects to services, cache, and database
  rpc: ['service', 'postgres', 'kafka'], // RPC connects to services, database, and message broker
  service: ['postgres', 'redis', 'kafka', 'service'], // Services connect to databases, cache, message broker, and other services
  kafka: ['service', 'rpc'], // Kafka connects to services and RPC (both producers and consumers)
  redis: ['service', 'restApi'], // Redis connects to services and REST API
  postgres: ['service', 'restApi', 'rpc'] // PostgreSQL connects to services, REST API, and RPC
};

export default function TechVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const dataPacketsRef = useRef<DataPacket[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create architecture nodes with logical positioning
    const createArchitectureNodes = () => {
      const nodes: Node[] = [];
      
      // Define payment gateway architecture components with logical grouping
      const components = [
        // Databases and Caches - Top part of screen
        { type: 'postgres' as const, label: 'PostgreSQL', zone: 'top' },
        { type: 'redis' as const, label: 'Redis Cache', zone: 'top' },
        
        // Message Buses - Left bottom part of screen
        { type: 'kafka' as const, label: 'Kafka', zone: 'left-bottom' },
        
        // API Gateways - Middle center
        { type: 'apiGateway' as const, label: 'API Gateway', zone: 'center' },
        { type: 'restApi' as const, label: 'REST API', zone: 'center' },
        { type: 'rpc' as const, label: 'RPC Service', zone: 'center' },
        
        // Services (User-facing) - Right part of screen
        { type: 'service' as const, label: 'Payment Service', zone: 'right-top' },
        { type: 'service' as const, label: 'User Service', zone: 'right-top' },
        { type: 'service' as const, label: 'Auth Service', zone: 'right-top' },
        { type: 'service' as const, label: 'Notification Service', zone: 'right-bottom' },
        { type: 'service' as const, label: 'Fraud Detection', zone: 'right-bottom' },
        { type: 'service' as const, label: 'Analytics Service', zone: 'right-bottom' },
        { type: 'service' as const, label: 'Audit Service', zone: 'right-bottom' }
      ];
      
      // Function to check if a position is valid (no overlaps)
      const isValidPosition = (x: number, y: number, width: number, height: number, existingNodes: Node[]): boolean => {
        const minDistance = 120; // Increased minimum distance between components
        
        for (const existingNode of existingNodes) {
          const existingType = NODE_TYPES[existingNode.type];
          const dx = Math.abs(x - existingNode.x);
          const dy = Math.abs(y - existingNode.y);
          const minRequiredDistance = (width + existingType.width) / 2 + minDistance;
          
          if (dx < minRequiredDistance && dy < minRequiredDistance) {
            return false;
          }
        }
        
        // Check canvas boundaries with more padding
        return x >= width/2 + 50 && x <= canvas.width - width/2 - 50 &&
               y >= height/2 + 50 && y <= canvas.height - height/2 - 50;
      };

      // Function to get position based on zone with maximum spacing
      const getZonePosition = (zone: string, nodeType: any, existingNodes: Node[]) => {
        const padding = 80; // Increased padding
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        let zoneX, zoneY, zoneWidth, zoneHeight;
        
        switch (zone) {
          case 'top':
            // Top part of screen - databases and caches (wider area)
            zoneX = padding;
            zoneY = padding;
            zoneWidth = canvas.width - 2 * padding;
            zoneHeight = 200;
            break;
            
          case 'left-bottom':
            // Left bottom - message buses (larger area)
            zoneX = padding;
            zoneY = canvas.height - 250;
            zoneWidth = 300;
            zoneHeight = 200;
            break;
            
          case 'center':
            // Center - API gateways (larger area)
            zoneX = centerX - 150;
            zoneY = centerY - 150;
            zoneWidth = 300;
            zoneHeight = 300;
            break;
            
          case 'right-top':
            // Right top - user-facing services (larger area)
            zoneX = canvas.width - 400;
            zoneY = padding;
            zoneWidth = 350;
            zoneHeight = 250;
            break;
            
          case 'right-bottom':
            // Right bottom - background services (larger area)
            zoneX = canvas.width - 400;
            zoneY = canvas.height - 300;
            zoneWidth = 350;
            zoneHeight = 250;
            break;
            
          default:
            zoneX = centerX - 50;
            zoneY = centerY - 50;
            zoneWidth = 100;
            zoneHeight = 100;
        }
        
        // Try to find a valid position within the zone with more attempts
        const maxAttempts = 200; // Increased attempts
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
          const x = zoneX + Math.random() * zoneWidth;
          const y = zoneY + Math.random() * zoneHeight;
          
          // Ensure position is within canvas bounds with proper padding
          const finalX = Math.max(nodeType.width/2 + padding, Math.min(canvas.width - nodeType.width/2 - padding, x));
          const finalY = Math.max(nodeType.height/2 + padding, Math.min(canvas.height - nodeType.height/2 - padding, y));
          
          if (isValidPosition(finalX, finalY, nodeType.width, nodeType.height, existingNodes)) {
            return { x: finalX, y: finalY };
          }
        }
        
        // If no valid position found in zone, try the entire canvas
        for (let attempt = 0; attempt < 100; attempt++) {
          const x = padding + Math.random() * (canvas.width - 2 * padding);
          const y = padding + Math.random() * (canvas.height - 2 * padding);
          
          if (isValidPosition(x, y, nodeType.width, nodeType.height, existingNodes)) {
            return { x, y };
          }
        }
        
        // Final fallback - use a grid-based approach
        const gridCols = Math.ceil(Math.sqrt(components.length));
        const gridRows = Math.ceil(components.length / gridCols);
        const cellWidth = (canvas.width - 2 * padding) / gridCols;
        const cellHeight = (canvas.height - 2 * padding) / gridRows;
        const index = existingNodes.length;
        const col = index % gridCols;
        const row = Math.floor(index / gridCols);
        
        return {
          x: padding + col * cellWidth + cellWidth / 2,
          y: padding + row * cellHeight + cellHeight / 2
        };
      };

      components.forEach((component, i) => {
        const nodeType = NODE_TYPES[component.type];
        const position = getZonePosition(component.zone, nodeType, nodes);
        
        nodes.push({
          x: position.x,
          y: position.y,
          vx: (Math.random() - 0.5) * 0.03, // Reduced movement speed for better positioning
          vy: (Math.random() - 0.5) * 0.03,
          type: component.type,
          size: 1,
          opacity: Math.random() * 0.2 + 0.3, // Much more transparent
          connections: [],
          label: component.label,
          pulsePhase: Math.random() * Math.PI * 2,
          dataFlowPhase: Math.random() * Math.PI * 2
        });
      });
      
      nodesRef.current = nodes;
    };

    createArchitectureNodes();

    // Create data packets for flow visualization
    const createDataPackets = () => {
      const packets: DataPacket[] = [];
      const nodes = nodesRef.current;
      
      // Create initial data packets following realistic connection rules
      for (let i = 0; i < 6; i++) {
        const fromIndex = Math.floor(Math.random() * nodes.length);
        const fromNode = nodes[fromIndex];
        const allowedConnections = CONNECTION_RULES[fromNode.type];
        
        // Find a valid target node
        let toIndex = -1;
        for (let attempts = 0; attempts < 10; attempts++) {
          const candidateIndex = Math.floor(Math.random() * nodes.length);
          if (candidateIndex !== fromIndex && allowedConnections.includes(nodes[candidateIndex].type)) {
            toIndex = candidateIndex;
            break;
          }
        }
        
        if (toIndex !== -1) {
          packets.push({
            from: fromIndex,
            to: toIndex,
            progress: Math.random(),
            type: ['request', 'response', 'data'][Math.floor(Math.random() * 3)] as 'request' | 'response' | 'data',
            size: Math.random() * 4 + 3
          });
        }
      }
      
      dataPacketsRef.current = packets;
    };

    createDataPackets();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Shape drawing functions
    const drawShape = (ctx: CanvasRenderingContext2D, x: number, y: number, nodeType: any, pulse: number) => {
      const width = nodeType.width * pulse;
      const height = nodeType.height * pulse;
      const halfWidth = width / 2;
      const halfHeight = height / 2;
      
      ctx.save();
      ctx.translate(x, y);
      
      switch (nodeType.shape) {
        case 'rectangle':
          ctx.beginPath();
          ctx.roundRect(-halfWidth, -halfHeight, width, height, nodeType.cornerRadius);
          break;
          
        case 'cylinder':
          // Draw cylinder (rectangle with rounded top/bottom)
          ctx.beginPath();
          ctx.roundRect(-halfWidth, -halfHeight + 10, width, height - 20, nodeType.cornerRadius);
          // Top ellipse
          ctx.ellipse(0, -halfHeight + 10, halfWidth, 10, 0, 0, Math.PI * 2);
          // Bottom ellipse
          ctx.ellipse(0, halfHeight - 10, halfWidth, 10, 0, 0, Math.PI * 2);
          break;
          
        case 'diamond':
          ctx.beginPath();
          ctx.moveTo(0, -halfHeight);
          ctx.lineTo(halfWidth, 0);
          ctx.lineTo(0, halfHeight);
          ctx.lineTo(-halfWidth, 0);
          ctx.closePath();
          break;
      }
      
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const nodes = nodesRef.current;
      const dataPackets = dataPacketsRef.current;
      const mouse = mouseRef.current;

            // STEP 1: Update node positions (no drawing yet)
            nodes.forEach((node, i) => {
              const nodeType = NODE_TYPES[node.type];
              const minDistance = 120; // Increased minimum distance between components
        
              // Store original position
              const originalX = node.x;
              const originalY = node.y;
              
              // Update position
              node.x += node.vx;
              node.y += node.vy;

              // Check for collisions with other nodes
              let hasCollision = false;
              nodes.forEach((otherNode, j) => {
                if (i !== j) {
                  const otherType = NODE_TYPES[otherNode.type];
                  const dx = Math.abs(node.x - otherNode.x);
                  const dy = Math.abs(node.y - otherNode.y);
                  const minRequiredDistance = (nodeType.width + otherType.width) / 2 + minDistance;
                  
                  if (dx < minRequiredDistance && dy < minRequiredDistance) {
                    hasCollision = true;
                  }
                }
              });

              // If collision detected, revert to original position and reverse velocity
              if (hasCollision) {
                node.x = originalX;
                node.y = originalY;
                node.vx *= -1;
                node.vy *= -1;
              }

              // Bounce off edges with proper boundaries (increased padding)
              const halfWidth = nodeType.width / 2;
              const halfHeight = nodeType.height / 2;
              const edgePadding = 50; // Increased edge padding
              
              if (node.x < halfWidth + edgePadding || node.x > canvas.width - halfWidth - edgePadding) {
                node.vx *= -1;
                node.x = Math.max(halfWidth + edgePadding, Math.min(canvas.width - halfWidth - edgePadding, node.x));
              }
              if (node.y < halfHeight + edgePadding || node.y > canvas.height - halfHeight - edgePadding) {
                node.vy *= -1;
                node.y = Math.max(halfHeight + edgePadding, Math.min(canvas.height - halfHeight - edgePadding, node.y));
              }

              // Mouse interaction with collision detection
              const dx = mouse.x - node.x;
              const dy = mouse.y - node.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 150) {
                const force = (150 - distance) / 150;
                const newX = node.x - (dx / distance) * force * 0.2;
                const newY = node.y - (dy / distance) * force * 0.2;
                
                // Check if mouse interaction would cause collision
                let mouseCollision = false;
                nodes.forEach((otherNode, j) => {
                  if (i !== j) {
                    const otherType = NODE_TYPES[otherNode.type];
                    const dx2 = Math.abs(newX - otherNode.x);
                    const dy2 = Math.abs(newY - otherNode.y);
                    const minRequiredDistance = (nodeType.width + otherType.width) / 2 + minDistance;
                    
                    if (dx2 < minRequiredDistance && dy2 < minRequiredDistance) {
                      mouseCollision = true;
                    }
                  }
                });
                
                // Only apply mouse interaction if no collision
                if (!mouseCollision) {
                  node.x = Math.max(halfWidth + edgePadding, Math.min(canvas.width - halfWidth - edgePadding, newX));
                  node.y = Math.max(halfHeight + edgePadding, Math.min(canvas.height - halfHeight - edgePadding, newY));
                }
              }

              // Update pulse phase
              node.pulsePhase += 0.02;
              node.dataFlowPhase += 0.01;
            });

             // Helper function to determine which side of the node to connect to
             const getConnectionSide = (nodeX: number, nodeY: number, targetX: number, targetY: number) => {
               const dx = targetX - nodeX;
               const dy = targetY - nodeY;
               
               if (Math.abs(dx) > Math.abs(dy)) {
                 return dx > 0 ? 'right' : 'left';
               } else {
                 return dy > 0 ? 'bottom' : 'top';
               }
             };

             // Helper function to calculate center of component side
             const getSideCenter = (nodeX: number, nodeY: number, nodeType: any, targetX: number, targetY: number) => {
               const halfWidth = nodeType.width / 2;
               const halfHeight = nodeType.height / 2;
               
               const side = getConnectionSide(nodeX, nodeY, targetX, targetY);
               
               switch (side) {
                 case 'right':
                   return { x: nodeX + halfWidth, y: nodeY, side: 'right' };
                 case 'left':
                   return { x: nodeX - halfWidth, y: nodeY, side: 'left' };
                 case 'bottom':
                   return { x: nodeX, y: nodeY + halfHeight, side: 'bottom' };
                 case 'top':
                   return { x: nodeX, y: nodeY - halfHeight, side: 'top' };
                 default:
                   return { x: nodeX + halfWidth, y: nodeY, side: 'right' };
               }
             };

             // Функция для создания точки СНАРУЖИ фигуры
             const getExternalConnectionPoint = (nodeX: number, nodeY: number, nodeType: any, targetX: number, targetY: number, offset: number = 120) => {
               const halfWidth = nodeType.width / 2;
               const halfHeight = nodeType.height / 2;
               
               const side = getConnectionSide(nodeX, nodeY, targetX, targetY);
               
               switch (side) {
                 case 'right':
                   return { 
                     border: { x: nodeX + halfWidth, y: nodeY },
                     external: { x: nodeX + halfWidth + offset, y: nodeY },
                     side: 'right' 
                   };
                 case 'left':
                   return { 
                     border: { x: nodeX - halfWidth, y: nodeY },
                     external: { x: nodeX - halfWidth - offset, y: nodeY },
                     side: 'left' 
                   };
                 case 'bottom':
                   return { 
                     border: { x: nodeX, y: nodeY + halfHeight },
                     external: { x: nodeX, y: nodeY + halfHeight + offset },
                     side: 'bottom' 
                   };
                 case 'top':
                   return { 
                     border: { x: nodeX, y: nodeY - halfHeight },
                     external: { x: nodeX, y: nodeY - halfHeight - offset },
                     side: 'top' 
                   };
                 default:
                   return { 
                     border: { x: nodeX + halfWidth, y: nodeY },
                     external: { x: nodeX + halfWidth + offset, y: nodeY },
                     side: 'right' 
                   };
               }
             };

             // Простая и надежная функция для создания ортогональных путей
             const createManhattanPath = (startConnection: any, endConnection: any) => {
               let points = [];
               
               // Начинаем от границы стартовой фигуры
               points.push(startConnection.border);
               
               // Отходим наружу от стартовой фигуры
               points.push(startConnection.external);
               
               // Соединяем с внешней точкой конечной фигуры
               const startExt = startConnection.external;
               const endExt = endConnection.external;
               
               if (startExt.x === endExt.x) {
                 // Уже на одной вертикали
                 if (startExt.y !== endExt.y) {
                   points.push(endExt);
                 }
               } else if (startExt.y === endExt.y) {
                 // Уже на одной горизонтали
                 if (startExt.x !== endExt.x) {
                   points.push(endExt);
                 }
               } else {
                 // Нужен L-образный поворот
                 const dx = Math.abs(endExt.x - startExt.x);
                 const dy = Math.abs(endExt.y - startExt.y);
                 
                 if (dx > dy) {
                   // Горизонтальная дистанция больше
                   points.push({ x: endExt.x, y: startExt.y });
                 } else {
                   // Вертикальная дистанция больше
                   points.push({ x: startExt.x, y: endExt.y });
                 }
                 points.push(endExt);
               }
               
               // Подходим к границе конечной фигуры
               points.push(endConnection.border);
               
               return { type: 'manhattan', points };
             };

            // STEP 2: LAYER 1 - Draw connections first (lowest z-index - behind everything)
            nodes.forEach((node, i) => {
              const nodeType = NODE_TYPES[node.type];
              node.connections = [];
              
              nodes.forEach((otherNode, j) => {
                if (i !== j) {
                  const dx = node.x - otherNode.x;
                  const dy = node.y - otherNode.y;
                  const distance = Math.sqrt(dx * dx + dy * dy);

                  // Check if connection is allowed based on realistic architecture rules
                  const allowedConnections = CONNECTION_RULES[node.type];
                  const isConnectionAllowed = allowedConnections.includes(otherNode.type);
                  
                  // Increased connection distance (doubled)
                  const maxDistance = 300;
                  
                  if (distance < maxDistance && isConnectionAllowed) {
                    const opacity = (maxDistance - distance) / maxDistance * 0.3;
                    
                     // Calculate external connection points (СНАРУЖИ фигур)
                     const startConnection = getExternalConnectionPoint(node.x, node.y, nodeType, otherNode.x, otherNode.y);
                     const endConnection = getExternalConnectionPoint(otherNode.x, otherNode.y, NODE_TYPES[otherNode.type], node.x, node.y);
                     
                     // Calculate optimal orthogonal path
                     const pathData = createManhattanPath(startConnection, endConnection);
                     
                     // Draw the orthogonal path
                     ctx.beginPath();
                     ctx.moveTo(pathData.points[0].x, pathData.points[0].y);
                     for (let i = 1; i < pathData.points.length; i++) {
                       ctx.lineTo(pathData.points[i].x, pathData.points[i].y);
                     }
                    
                    // Different line styles for different connections
                    if (node.type === 'postgres' || otherNode.type === 'postgres') {
                      ctx.setLineDash([8, 4]);
                      ctx.strokeStyle = `rgba(255, 212, 59, ${opacity})`;
                    } else if (node.type === 'kafka' || otherNode.type === 'kafka') {
                      ctx.setLineDash([4, 8]);
                      ctx.strokeStyle = `rgba(46, 204, 113, ${opacity})`;
                    } else if (node.type === 'redis' || otherNode.type === 'redis') {
                      ctx.setLineDash([2, 6]);
                      ctx.strokeStyle = `rgba(230, 126, 34, ${opacity})`;
                    } else if (node.type === 'apiGateway' || otherNode.type === 'apiGateway') {
                      ctx.setLineDash([12, 4]);
                      ctx.strokeStyle = `rgba(142, 68, 173, ${opacity})`;
                    } else {
                      ctx.setLineDash([]);
                      ctx.strokeStyle = `rgba(0, 173, 216, ${opacity})`;
                    }
                    
                    ctx.lineWidth = 2; // Increased line width
                    ctx.stroke();
                    node.connections.push(j);
                  }
                }
              });
            });

            // STEP 3: LAYER 2 - Draw nodes (middle z-index - above connections, below data packets)
            nodes.forEach((node, i) => {
              const nodeType = NODE_TYPES[node.type];
              const pulse = Math.sin(node.pulsePhase) * 0.1 + 1;
              
              // Draw outer glow/shadow
              ctx.shadowColor = nodeType.color;
              ctx.shadowBlur = 15;
              ctx.shadowOffsetX = 0;
              ctx.shadowOffsetY = 0;
              
              // Draw main shape
              drawShape(ctx, node.x, node.y, nodeType, pulse);
              ctx.fillStyle = `${nodeType.color}${Math.floor(node.opacity * 255).toString(16).padStart(2, '0')}`;
              ctx.fill();
              
              // Reset shadow
              ctx.shadowBlur = 0;
              
              // Draw border
              drawShape(ctx, node.x, node.y, nodeType, pulse);
              ctx.strokeStyle = nodeType.color;
              ctx.lineWidth = 2;
              ctx.stroke();
              
              // Draw label (no icons)
              ctx.font = '14px Arial';
              ctx.fillStyle = nodeType.color;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(node.label, node.x, node.y);
            });

            // STEP 4: LAYER 3 - Update and draw data packets (highest z-index - above everything)
            dataPackets.forEach((packet, i) => {
        const fromNode = nodes[packet.from];
        const toNode = nodes[packet.to];
        
        if (!fromNode || !toNode) {
          return;
        }

        // Update packet progress
        packet.progress += 0.006; // Slightly slower for orthogonal paths
        
         // Calculate external connection points for the data packet (СНАРУЖИ фигур)
         const fromNodeType = NODE_TYPES[fromNode.type];
         const toNodeType = NODE_TYPES[toNode.type];
         
         const startConnection = getExternalConnectionPoint(fromNode.x, fromNode.y, fromNodeType, toNode.x, toNode.y);
         const endConnection = getExternalConnectionPoint(toNode.x, toNode.y, toNodeType, fromNode.x, fromNode.y);
         
         // Calculate optimal orthogonal path for packet movement
         const pathData = createManhattanPath(startConnection, endConnection);
        
        // Calculate packet position along the orthogonal path
        let packetX, packetY;
        
        // Find which segment the packet is currently on
        const totalSegments = pathData.points.length - 1;
        const segmentProgress = packet.progress * totalSegments;
        const currentSegment = Math.floor(segmentProgress);
        const segmentLocalProgress = segmentProgress - currentSegment;
        
        if (currentSegment >= totalSegments) {
          // Packet reached the end
          packetX = endConnection.border.x;
          packetY = endConnection.border.y;
        } else {
          // Interpolate along current segment
          const segmentStart = pathData.points[currentSegment];
          const segmentEnd = pathData.points[currentSegment + 1];
          
          packetX = segmentStart.x + (segmentEnd.x - segmentStart.x) * segmentLocalProgress;
          packetY = segmentStart.y + (segmentEnd.y - segmentStart.y) * segmentLocalProgress;
        }
        
         // Draw orthogonal path for data packets
         ctx.beginPath();
         ctx.moveTo(pathData.points[0].x, pathData.points[0].y);
         for (let i = 1; i < pathData.points.length; i++) {
           ctx.lineTo(pathData.points[i].x, pathData.points[i].y);
         }
         
         // Different line styles based on packet type
         if (packet.type === 'request') {
           ctx.strokeStyle = 'rgba(142, 68, 173, 0.6)';
           ctx.setLineDash([8, 4]);
         } else if (packet.type === 'response') {
           ctx.strokeStyle = 'rgba(231, 76, 60, 0.6)';
           ctx.setLineDash([4, 8]);
         } else {
           ctx.strokeStyle = 'rgba(46, 204, 113, 0.6)';
           ctx.setLineDash([]);
         }
         
         ctx.lineWidth = 2;
         ctx.stroke();
         ctx.setLineDash([]);
        
        // Draw moving data packet
        ctx.beginPath();
        ctx.arc(packetX, packetY, packet.size, 0, Math.PI * 2);
        
        // Different colors for different packet types
        if (packet.type === 'request') {
          ctx.fillStyle = '#8e44ad'; // Purple for requests
        } else if (packet.type === 'response') {
          ctx.fillStyle = '#e74c3c'; // Red for responses
        } else {
          ctx.fillStyle = '#2ecc71'; // Green for data
        }
        
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw packet icon
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        
        const icon = packet.type === 'request' ? '→' : packet.type === 'response' ? '←' : '●';
        ctx.fillText(icon, packetX, packetY);
        
        // Reset packet when it reaches destination
        if (packet.progress >= 1) {
          packet.progress = 0;
          packet.from = Math.floor(Math.random() * nodes.length);
          
          // Find a valid target following realistic rules
          const fromNode = nodes[packet.from];
          const allowedConnections = CONNECTION_RULES[fromNode.type];
          let toIndex = -1;
          
          for (let attempts = 0; attempts < 10; attempts++) {
            const candidateIndex = Math.floor(Math.random() * nodes.length);
            if (candidateIndex !== packet.from && allowedConnections.includes(nodes[candidateIndex].type)) {
              toIndex = candidateIndex;
              break;
            }
          }
          
          if (toIndex !== -1) {
            packet.to = toIndex;
          }
          
          packet.type = ['request', 'response', 'data'][Math.floor(Math.random() * 3)] as 'request' | 'response' | 'data';
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.techVisualization}
    />
  );
}
