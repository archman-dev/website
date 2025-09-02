import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

type HighlightSide = 'pros' | 'cons';
type Tone = 'neutral' | 'positive' | 'warning' | 'info';

type Props = {
  title?: React.ReactNode;
  /** Title/label for the pros column (e.g., "Do"). No default is provided. */
  prosTitle: React.ReactNode;
  pros: React.ReactNode[];
  /** Title/label for the cons column (e.g., "Avoid"). No default is provided. */
  consTitle: React.ReactNode;
  cons: React.ReactNode[];
  /** Which side(s) to emphasize. By default, none are highlighted. */
  highlight?: HighlightSide | HighlightSide[];
  /** Emphasis tone for highlighted side(s); follows Showcase tones. Default: neutral */
  highlightTone?: Tone;
};

export default function ProsCons({ title, prosTitle, pros, consTitle, cons, highlight, highlightTone = 'neutral' }: Props) {
  const highlightSet = React.useMemo(() => {
    const set = new Set<HighlightSide>();
    if (Array.isArray(highlight)) {
      highlight.forEach((h) => set.add(h));
    } else if (highlight) {
      set.add(highlight);
    }
    return set;
  }, [highlight]);

  return (
    <section className={styles.container}>
      {title ? <h3 className={styles.heading}>{title}</h3> : null}
      <div className={styles.grid}>
        <div
          className={clsx(
            styles.card,
            highlightSet.has('pros') && highlightTone === 'neutral' && styles.emNeutral,
            highlightSet.has('pros') && highlightTone === 'positive' && styles.emPositive,
            highlightSet.has('pros') && highlightTone === 'warning' && styles.emWarning,
            highlightSet.has('pros') && highlightTone === 'info' && styles.emInfo,
          )}
        >
          <strong>{prosTitle}</strong>
          <ul>
            {pros.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
        <div
          className={clsx(
            styles.card,
            highlightSet.has('cons') && highlightTone === 'neutral' && styles.emNeutral,
            highlightSet.has('cons') && highlightTone === 'positive' && styles.emPositive,
            highlightSet.has('cons') && highlightTone === 'warning' && styles.emWarning,
            highlightSet.has('cons') && highlightTone === 'info' && styles.emInfo,
          )}
        >
          <strong>{consTitle}</strong>
          <ul>
            {cons.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

