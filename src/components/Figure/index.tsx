import React from 'react';
import styles from './styles.module.css';

type Props = {
  caption?: React.ReactNode;
  children: React.ReactNode;
};

export default function Figure({ caption, children }: Props) {
  return (
    <figure className={styles.figure}>
      {children}
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
