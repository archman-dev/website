import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

export type ShowcaseSection = {
  label: React.ReactNode;
  body: React.ReactNode;
  tone?: 'neutral' | 'positive' | 'warning' | 'info';
};

export type ShowcaseProps = {
  title: React.ReactNode;
  /** Back-compat: legacy named sections */
  impact?: React.ReactNode;
  tradeoffs?: React.ReactNode;
  /** New: arbitrary sections rendered in order */
  sections?: ShowcaseSection[];
  /** Alternative: map syntax for sections. Keys are default labels; values may be a body ReactNode or an object with body/label/tone. */
  sectionsMap?: Record<string, React.ReactNode | { body: React.ReactNode; label?: React.ReactNode; tone?: 'neutral' | 'positive' | 'warning' | 'info' }>;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  /** Card tone */
  tone?: 'neutral' | 'positive' | 'warning' | 'info';
};

export function Showcase({ title, impact, tradeoffs, sections, sectionsMap, children, icon, tone = 'neutral' }: ShowcaseProps) {
  const derivedSections: ShowcaseSection[] = React.useMemo(() => {
    if (sections && sections.length > 0) return sections;
    if (sectionsMap && Object.keys(sectionsMap).length > 0) {
      return Object.entries(sectionsMap).map(([k, val]) => {
        if (typeof val === 'object' && val !== null && ('body' in (val as any) || 'label' in (val as any) || 'tone' in (val as any))) {
          const v = val as { body: React.ReactNode; label?: React.ReactNode; tone?: 'neutral' | 'positive' | 'warning' | 'info' };
          return { label: v.label ?? k, body: v.body, tone: v.tone };
        }
        return { label: k, body: val as React.ReactNode };
      });
    }
    const s: ShowcaseSection[] = [];
    if (impact) s.push({ label: 'Impact', body: impact });
    if (tradeoffs) s.push({ label: 'Trade‑offs', body: tradeoffs });
    return s;
  }, [sections, sectionsMap, impact, tradeoffs]);

  return (
    <div className={clsx(styles.card, styles[tone])}>
      <div className={styles.header}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <h3 className={styles.title}>{title}</h3>
      </div>

      {derivedSections.map((s, i) => (
        <div
          key={i}
          className={clsx(
            styles.section,
            s.tone === 'positive' && styles.sectionTone_positive,
            s.tone === 'warning' && styles.sectionTone_warning,
            s.tone === 'info' && styles.sectionTone_info,
          )}
        >
          <div className={styles.sectionLabel}>{s.label}</div>
          <div className={styles.sectionBody}>{s.body}</div>
        </div>
      ))}

      {children && <div className={styles.body}>{children}</div>}
    </div>
  );
}

export default Showcase;
