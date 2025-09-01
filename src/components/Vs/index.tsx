import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

export type VsItem = {
  label: React.ReactNode;
  points: Array<string | React.ReactNode>;
};

export type VsProps = {
  /** New: any number of items (>=2) */
  items?: VsItem[];
  /** Alternative: map syntax for items. Keys not shown; values include label/points. */
  itemsMap?: Record<string, VsItem>;
  /** Back-compat: exactly two items */
  a?: VsItem;
  b?: VsItem;
  /** Highlight by index (0-based) or legacy 'a'/'b'/'none' */
  highlight?: number | 'a' | 'b' | 'none';
  /** Highlight tone for the emphasized card background/border */
  highlightTone?: 'neutral' | 'positive' | 'warning' | 'info';
  title?: React.ReactNode;
};

export default function Vs({ items, itemsMap, a, b, highlight = 'none', highlightTone = 'neutral', title }: VsProps) {
  const computed: VsItem[] = React.useMemo(() => {
    if (items && items.length >= 2) return items;
    if (itemsMap && Object.keys(itemsMap).length >= 2) {
      return Object.values(itemsMap);
    }
    if (a && b) return [a, b];
    // If not enough items, return empty array to avoid render errors
    return [];
  }, [items, itemsMap, a, b]);

  const highlightIndex: number | undefined = React.useMemo(() => {
    if (typeof highlight === 'number') return highlight;
    if (highlight === 'a') return 0;
    if (highlight === 'b') return 1;
    return undefined;
  }, [highlight]);

  if (computed.length < 2) return null;

  return (
    <div className={styles.wrapper}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={clsx(styles.grid, styles.auto)}>
        {computed.map((item, idx) => (
          <div
            key={idx}
            className={clsx(
              styles.card,
              highlightIndex === idx && highlightTone === 'neutral' && styles.emNeutral,
              highlightIndex === idx && highlightTone === 'positive' && styles.emPositive,
              highlightIndex === idx && highlightTone === 'warning' && styles.emWarning,
              highlightIndex === idx && highlightTone === 'info' && styles.emInfo,
            )}
          >
            <div className={styles.header}>{item.label}</div>
            <ul className={styles.list}>
              {item.points.map((p, i) => (
                <li key={i} className={styles.point}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
