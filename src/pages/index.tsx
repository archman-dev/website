import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const techBadges = [
    {label: 'Python', className: styles.badgePython},
    {label: 'Go', className: styles.badgeGo},
    {label: 'Node.js', className: styles.badgeNode},
  ];
  const topicBadges = [
    'Architecture',
    'System Design',
    'Design Patterns',
    'Microservices',
    'Event-Driven',
    'Monolith',
    'DDD',
    'CQRS',
    'Saga',
    'REST',
    'gRPC',
    'Messaging',
    'Caching',
    'Consistency',
    'CAP Theorem',
    'Scalability',
    'Reliability',
    'Performance',
    'Resilience',
    'Observability',
    'SLOs',
    'SLIs',
    'Tracing',
    'Metrics',
    'Logging',
    'Security',
    'OAuth2',
    'JWT',
    'Threat Modeling',
    'Cloud',
    'Kubernetes',
    'Docker',
    'IaC',
    'Terraform',
    'API Gateway',
    'Service Mesh',
    'Data Modeling',
    'ACID',
    'BASE',
    'Sharding',
    'Replication',
    'Streaming',
  ];
  const getBadgeClass = (label: string): string | undefined => {
    switch (label) {
      case 'Architecture':
      case 'System Design':
      case 'Design Patterns':
      case 'Monolith':
        return styles.badgeArch;
      case 'Microservices':
      case 'Event-Driven':
      case 'API Gateway':
      case 'Service Mesh':
      case 'Messaging':
      case 'REST':
      case 'gRPC':
      case 'Saga':
      case 'CQRS':
        return styles.badgeIntegration;
      case 'Data Modeling':
      case 'ACID':
      case 'BASE':
      case 'Sharding':
      case 'Replication':
      case 'Consistency':
      case 'CAP Theorem':
      case 'Streaming':
        return styles.badgeData;
      case 'Scalability':
      case 'Performance':
      case 'Caching':
        return styles.badgePerformance;
      case 'Reliability':
      case 'Resilience':
      case 'Observability':
      case 'SLOs':
      case 'SLIs':
      case 'Tracing':
      case 'Metrics':
      case 'Logging':
        return styles.badgeReliability;
      case 'Security':
      case 'OAuth2':
      case 'JWT':
      case 'Threat Modeling':
        return styles.badgeSecurity;
      case 'Cloud':
      case 'Kubernetes':
      case 'Docker':
      case 'IaC':
      case 'Terraform':
        return styles.badgeCloud;
      default:
        return undefined;
    }
  };
  const badges = [
    ...techBadges.map(({label, className}) => ({label, className})),
    ...topicBadges.map((label) => ({label, className: getBadgeClass(label)})),
  ];

  // Shuffle badges client-side to avoid SSR hydration mismatches
  function shuffleArray<T>(arr: T[]): T[] {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const [row1, setRow1] = useState(badges);
  const [row2, setRow2] = useState(badges);
  function rotateArray<T>(arr: T[], offset: number): T[] {
    const n = arr.length;
    if (n === 0) return arr.slice();
    const k = ((offset % n) + n) % n;
    return arr.slice(k).concat(arr.slice(0, k));
  }
  useEffect(() => {
    const s = shuffleArray(badges);
    setRow1(s);
    // Create a varied second row but still seamless by duplicating same order per-row
    const offset = Math.floor(Math.random() * Math.max(1, s.length - 1));
    setRow2(rotateArray(s, offset));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
          Build Better Systems
          <br />
          <span className={styles.textGradient}>Architecture that scales</span>
        </Heading>
        <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
          {siteConfig.tagline}
        </p>
        <div className={styles.badgeScroller} aria-label="Topics and technologies">
          <div className={styles.scrollerInner} aria-hidden="false">
            <div className={clsx(styles.scrollerRow, styles.rowLeft)} aria-hidden="false">
              <div className={styles.rowTrackInner}>
                <div className={styles.scrollerTrack}>
                  {row1.map(({label, className}) => (
                    <span key={`r1a-${label}`} className={clsx(styles.badge, className)} aria-label={label}>
                      {label}
                    </span>
                  ))}
                </div>
                <div className={styles.scrollerTrack} aria-hidden="true">
                  {row1.map(({label, className}) => (
                    <span key={`r1b-${label}`} className={clsx(styles.badge, className)} aria-label={label}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={clsx(styles.scrollerRow, styles.rowRight)} aria-hidden="true">
              <div className={styles.rowTrackInner}>
                <div className={styles.scrollerTrack}>
                  {row2.map(({label, className}) => (
                    <span key={`r2a-${label}`} className={clsx(styles.badge, className)} aria-label={label}>
                      {label}
                    </span>
                  ))}
                </div>
                <div className={styles.scrollerTrack} aria-hidden="true">
                  {row2.map(({label, className}) => (
                    <span key={`r2b-${label}`} className={clsx(styles.badge, className)} aria-label={label}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            Start Learning →
          </Link>
          <Link className="button button--outline button--lg" to="/blog">
            Explore Blog
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
