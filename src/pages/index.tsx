import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
// import TechVisualization from '@site/src/components/TechVisualization';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
          <span className={clsx(styles.textGradient, styles.heroMainTitle)}>Software Architecture</span>
          Online Manual & Learning Hub
          <br />
          <span className={styles.heroSubtitle}>at Any Scale</span>
        </Heading>
        <p className={clsx('hero__subtitle', styles.heroDescription)}>
          ArchMan is a comprehensive platform for learning software architecture from first principles to real-world systems, designed for modern engineering teams.
        </p>
        
        {/* Performance Stats */}
        <div className={styles.performanceStats}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>700+</div>
            <div className={styles.statLabel}>Articles</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>23</div>
            <div className={styles.statLabel}>Categories</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>3</div>
            <div className={styles.statLabel}>Tech Stacks</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Free & Open Source</div>
          </div>
        </div>

        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/welcome/">
            Start Learning for Free
          </Link>
          <Link className="button button--outline button--lg" to="https://github.com/archman-dev">
            <svg className={styles.githubIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
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
      {/* <TechVisualization /> */}
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
