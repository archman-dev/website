import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

export type ShowcaseSection = {
  label: React.ReactNode;
  body: React.ReactNode;
  tone?: 'neutral' | 'positive' | 'warning' | 'info';
  /** Optional: highlight tone specifically for this section; overrides Showcase.highlightTone when this section is highlighted */
  highlightTone?: 'neutral' | 'positive' | 'warning' | 'info';
};

export type ShowcaseProps = {
  title: React.ReactNode;
  /** New: arbitrary sections rendered in order */
  sections?: ShowcaseSection[];
  /** Alternative: map syntax for sections. Keys are default labels; values may be a body ReactNode or an object with body/label/tone. */
  sectionsMap?: Record<string, React.ReactNode | { body: React.ReactNode; label?: React.ReactNode; tone?: 'neutral' | 'positive' | 'warning' | 'info'; highlightTone?: 'neutral' | 'positive' | 'warning' | 'info' }>;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  /** Card tone */
  tone?: 'neutral' | 'positive' | 'warning' | 'info';
  /** Highlight by index (0-based). Supports single index or multiple via number[]. */
  highlight?: number | number[];
  /** Highlight tone for the emphasized section background/border when highlighted and section does not set its own highlightTone */
  highlightTone?: 'neutral' | 'positive' | 'warning' | 'info';
};

export function Showcase({ title, sections, sectionsMap, children, icon, tone = 'neutral', highlight, highlightTone = 'neutral' }: ShowcaseProps) {
  const derivedSections: ShowcaseSection[] = React.useMemo(() => {
    if (sections && sections.length > 0) {
      return sections;
    }
    if (sectionsMap && Object.keys(sectionsMap).length > 0) {
      return Object.entries(sectionsMap).map(([k, val]) => {
        if (typeof val === 'object' && val !== null && ('body' in (val as any) || 'label' in (val as any) || 'tone' in (val as any) || 'highlightTone' in (val as any))) {
          const v = val as { body: React.ReactNode; label?: React.ReactNode; tone?: 'neutral' | 'positive' | 'warning' | 'info'; highlightTone?: 'neutral' | 'positive' | 'warning' | 'info' };
          return { label: v.label ?? k, body: v.body, tone: v.tone, highlightTone: v.highlightTone };
        }
        return { label: k, body: val as React.ReactNode };
      });
    }
    return [];
  }, [sections, sectionsMap]);

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

  return (
    <div className={clsx(styles.card, styles[tone])}>
      <div className={styles.header}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <h3 className={styles.title}>{title}</h3>
      </div>

      {derivedSections.map((s, i) => {
        const effectiveTone = s.tone ?? tone;
        const effHighlightTone = s.highlightTone ?? highlightTone;
        const isHighlighted = highlightSet.has(i);
        return (
          <div
            key={i}
            className={clsx(
              styles.section,
              // Section tone accent for labels
              effectiveTone === 'positive' && styles.sectionTone_positive,
              effectiveTone === 'warning' && styles.sectionTone_warning,
              effectiveTone === 'info' && styles.sectionTone_info,
              // Emphasis background/border when highlighted
              isHighlighted && effHighlightTone === 'neutral' && styles.emNeutral,
              isHighlighted && effHighlightTone === 'positive' && styles.emPositive,
              isHighlighted && effHighlightTone === 'warning' && styles.emWarning,
              isHighlighted && effHighlightTone === 'info' && styles.emInfo,
            )}
          >
            <div className={styles.sectionLabel}>{s.label}</div>
            <div className={styles.sectionBody}>{s.body}</div>
          </div>
        );
      })}

      {children && <div className={styles.body}>{children}</div>}
    </div>
  );
}

export default Showcase;
