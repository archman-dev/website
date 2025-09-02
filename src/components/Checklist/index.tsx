import React from 'react';
import styles from './styles.module.css';

export type ChecklistItem = React.ReactNode | { label: React.ReactNode; items?: ChecklistItem[] };

type Props = {
  title?: React.ReactNode;
  items: ChecklistItem[];
  copy?: boolean;
};

function labelToText(node: React.ReactNode): string {
  if (typeof node === 'string') {
    return node;
  }
  if (typeof node === 'number' || typeof node === 'boolean') {
    return String(node);
  }
  // Best-effort fallback for complex nodes
  return '[item]';
}

function buildMarkdown(items: ChecklistItem[], depth = 0): string {
  const pad = '  '.repeat(depth);
  return items
    .map((i) => {
      if (typeof i === 'object' && i !== null && 'label' in (i as any)) {
        const it = i as { label: React.ReactNode; items?: ChecklistItem[] };
        const head = `${pad}- [ ] ${labelToText(it.label)}`;
        const children = it.items && it.items.length ? `\n${buildMarkdown(it.items, depth + 1)}` : '';
        return head + children;
      }
      return `${pad}- [ ] ${labelToText(i as React.ReactNode)}`;
    })
    .join('\n');
}

function List({ items }: { items: ChecklistItem[] }) {
  return (
    <ul className={styles.list}>
      {items.map((i, idx) => {
        if (typeof i === 'object' && i !== null && 'label' in (i as any)) {
          const it = i as { label: React.ReactNode; items?: ChecklistItem[] };
          return (
            <li key={idx} className={styles.item}>
              <input type="checkbox" aria-label={`Checklist item: ${labelToText(it.label)}`} readOnly />
              <span>{it.label}</span>
              {it.items && it.items.length ? <List items={it.items} /> : null}
            </li>
          );
        }
        return (
          <li key={idx} className={styles.item}>
            <input type="checkbox" aria-label={`Checklist item: ${labelToText(i as React.ReactNode)}`} readOnly />
            <span>{i as React.ReactNode}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default function Checklist({ title, items, copy = true }: Props) {
  const text = React.useMemo(() => buildMarkdown(items), [items]);
  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        {title ? <h3 className={styles.heading}>{title}</h3> : null}
        {copy ? (
          <button type="button" className={styles.button} onClick={copyAll}>
            Copy checklist
          </button>
        ) : null}
      </div>
      <List items={items} />
    </section>
  );
}
