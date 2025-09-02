import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

export type VsItem = {
  label: React.ReactNode;
  points: Array<string | React.ReactNode>;
  /** Optional: highlight tone specifically for this item; overrides Vs.highlightTone when this item is highlighted */
  highlightTone?: 'neutral' | 'positive' | 'warning' | 'info';
};

export type VsProps = {
  /** New: any number of items (>=2) */
  items?: VsItem[];
  /** Alternative: map syntax for items. Keys not shown; values include label/points. */
  itemsMap?: Record<string, VsItem>;
  /** Highlight by index (0-based). Supports single index or multiple via number[]. */
  highlight?: number | number[];
  /** Highlight tone for the emphasized card background/border */
  highlightTone?: 'neutral' | 'positive' | 'warning' | 'info';
  title?: React.ReactNode;
};

export default function Vs({ items, itemsMap, highlight, highlightTone = 'neutral', title }: VsProps) {
  const computed: VsItem[] = React.useMemo(() => {
    if (items && items.length >= 2) {
      return items;
    }
    if (itemsMap && Object.keys(itemsMap).length >= 2) {
      return Object.values(itemsMap);
    }
    // If not enough items, return empty array to avoid render errors
    return [];
  }, [items, itemsMap]);

  const highlightSet: Set<number> = React.useMemo(() => {
    const set = new Set<number>();
  if (Array.isArray(highlight)) {
      highlight.forEach((h) => {
        if (typeof h === 'number') {
          set.add(h);
        }
      });
  } else if (typeof highlight === 'number') {
      set.add(highlight);
    }
    return set;
  }, [highlight]);

  if (computed.length < 2) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={clsx(styles.grid, styles.auto)}>
        {computed.map((item, idx) => (
          <div
            key={idx}
            className={clsx(
              styles.card,
              // Use per-item highlightTone if provided; otherwise fall back to Vs-level highlightTone
              highlightSet.has(idx) && (item.highlightTone ?? highlightTone) === 'neutral' && styles.emNeutral,
              highlightSet.has(idx) && (item.highlightTone ?? highlightTone) === 'positive' && styles.emPositive,
              highlightSet.has(idx) && (item.highlightTone ?? highlightTone) === 'warning' && styles.emWarning,
              highlightSet.has(idx) && (item.highlightTone ?? highlightTone) === 'info' && styles.emInfo,
            )}
          >
            <div className={styles.header}>{item.label}</div>
            <ol className={styles.list}>
              {item.points.map((p, i) => (
                <li key={i} className={styles.point}>{p}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
