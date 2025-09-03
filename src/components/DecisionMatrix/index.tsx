import React from 'react';
import styles from './styles.module.css';

type Tone = 'neutral' | 'positive' | 'warning' | 'info';

type Row = {
  name: React.ReactNode;
  cells: React.ReactNode[];
  recommended?: boolean;
  highlightTone?: Tone; // optional row highlight tone
};

type Props = {
  caption?: React.ReactNode;
  columns: React.ReactNode[]; // excludes first column
  rows: Row[];
};

export default function DecisionMatrix({ caption, columns, rows }: Props) {
  // Defensive defaults to avoid runtime errors if props are omitted/malformed in MDX usage
  const safeColumns: React.ReactNode[] = Array.isArray(columns) ? columns : [];
  const safeRows: Row[] = Array.isArray(rows) ? rows : [];

  return (
    <figure className={styles.figure}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Option</th>
            {safeColumns.map((c, i) => (
              <th key={i}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {safeRows.map((r, ri) => (
            <tr
              key={ri}
              className={
                r.recommended
                  ? styles.recommended
                  : r.highlightTone === 'positive'
                  ? styles.rowPositive
                  : r.highlightTone === 'warning'
                  ? styles.rowWarning
                  : r.highlightTone === 'info'
                  ? styles.rowInfo
                  : undefined
              }
            >
              <td>
                <strong>{r.name}</strong>
                {r.recommended ? ' ⭐' : ''}
              </td>
              {(Array.isArray(r.cells) ? r.cells : []).map((cell, ci) => (
                <td key={ci}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
