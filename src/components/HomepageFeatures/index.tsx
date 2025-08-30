import Heading from '@theme/Heading';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Architecture Fundamentals',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Learn the core principles behind scalable, reliable, and maintainable systems.
        Start with fundamentals, then build up to real-world complexity with confidence.
      </>
    ),
  },
  {
    title: 'Patterns & Practices',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Master design and integration patterns, anti-patterns, and architecture styles—
        with trade-offs and decision frameworks you can apply at work.
      </>
    ),
  },
  {
  title: 'Hands-on Examples',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
  Bridge theory and practice with concise examples in <strong>Python</strong>, <strong>Go</strong>, and <strong>Node.js</strong>,
        plus checklists, diagrams, and implementation guides.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
  {Svg ? <Svg className={styles.featureSvg} role="img" /> : null}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
