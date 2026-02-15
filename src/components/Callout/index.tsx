import React from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

export type CalloutProps = {
  tone?: 'neutral' | 'positive' | 'warning' | 'info';
  title?: React.ReactNode;
  children: React.ReactNode;
};

export default function Callout({ tone = 'info', title, children }: CalloutProps) {
  const icons: Record<string, string> = {
    neutral: '📌',
    positive: '✅',
    warning: '⚠️',
    info: 'ℹ️',
  };

  return (
    <div className={clsx(styles.callout, styles[`callout--${tone}`])}>
      <div className={styles.calloutIcon}>{icons[tone]}</div>
      <div className={styles.calloutContent}>
        {title && <div className={styles.calloutTitle}>{title}</div>}
        <div className={styles.calloutBody}>{children}</div>
      </div>
    </div>
  );
}

export { Callout };
