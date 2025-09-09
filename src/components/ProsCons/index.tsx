import clsx from 'clsx';
import React from 'react';
import MarkdownRenderer from '../Markdown';
import styles from './styles.module.css';

type HighlightSide = 'pros' | 'cons';
type Tone = 'neutral' | 'positive' | 'warning' | 'info';
type HighlightToneConfig = Tone | { pros?: Tone; cons?: Tone };

type Props = {
  title?: React.ReactNode;
  prosTitle: React.ReactNode;
  pros: React.ReactNode[];
  consTitle: React.ReactNode;
  cons: React.ReactNode[];
  highlight?: HighlightSide | HighlightSide[];
  /**
   * Tone applied to highlighted sides. Backward compatible:
   * - Pass a single Tone string to apply to all highlighted sides.
   * - Pass an object { pros: 'positive', cons: 'warning' } for per-side tones.
   */
  highlightTone?: HighlightToneConfig;
};

export default function ProsCons({
  title,
  prosTitle,
  pros,
  consTitle,
  cons,
  highlight = ['pros', 'cons'],
  highlightTone = { pros: 'positive', cons: 'warning' },
}: Props) {
  const highlightSet = React.useMemo(() => {
    const set = new Set<HighlightSide>();
    if (Array.isArray(highlight)) {
      highlight.forEach((h) => set.add(h));
    } else if (highlight) {
      set.add(highlight);
    }
    return set;
  }, [highlight]);

  // Derive effective tones per side (supports string or object form)
  const resolveTone = (side: HighlightSide): Tone | undefined => {
    if (!highlightSet.has(side)) {
      return undefined;
    }
    if (typeof highlightTone === 'string') {
      return highlightTone;
    }
    return highlightTone[side] || 'neutral';
  };
  const prosTone = resolveTone('pros');
  const consTone = resolveTone('cons');

  return (
    <section className={styles.container}>
      {title ? <h3 className={styles.heading}>{title}</h3> : null}
      <div className={styles.grid}>
        <div
          className={clsx(
            styles.card,
            prosTone === 'neutral' && styles.emNeutral,
            prosTone === 'positive' && styles.emPositive,
            prosTone === 'warning' && styles.emWarning,
            prosTone === 'info' && styles.emInfo,
          )}
        >
          <strong>{prosTitle}</strong>
          <ul>
            {pros.map((p, i) => (
              <li key={i}>{typeof p === 'string' ? <MarkdownRenderer content={p} /> : p}</li>
            ))}
          </ul>
        </div>
        <div
          className={clsx(
            styles.card,
            consTone === 'neutral' && styles.emNeutral,
            consTone === 'positive' && styles.emPositive,
            consTone === 'warning' && styles.emWarning,
            consTone === 'info' && styles.emInfo,
          )}
        >
          <strong>{consTitle}</strong>
          <ul>
            {cons.map((c, i) => (
              <li key={i}>{typeof c === 'string' ? <MarkdownRenderer content={c} /> : c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

