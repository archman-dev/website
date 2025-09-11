import Heading from '@theme/Heading';
import type { ReactNode } from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
  icon: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Ultra-High Performance',
    icon: '⚡',
    description: (
      <>
        Build systems that scale to millions of users with predictable performance thanks to proven architectural patterns and optimization techniques.
      </>
    ),
  },
  {
    title: 'Zero-Copy Architecture',
    icon: '🚀',
    description: (
      <>
        Learn efficient data flow patterns and memory management strategies for improved performance and reduced resource usage.
      </>
    ),
  },
  {
    title: 'Multiple Tech Stacks',
    icon: '🔧',
    description: (
      <>
        Master architecture patterns across <strong>Python</strong>, <strong>Go</strong>, and <strong>Node.js</strong> with language-agnostic principles that apply to any technology stack.
      </>
    ),
  },
  {
    title: 'Microservices & Integration',
    icon: '🔗',
    description: (
      <>
        Built-in support for microservices patterns, API design, service mesh, and distributed system integration strategies.
      </>
    ),
  },
  {
    title: 'Security & Authentication',
    icon: '🔒',
    description: (
      <>
        Comprehensive security architecture patterns, authentication strategies, and authorization models for enterprise applications.
      </>
    ),
  },
  {
    title: 'Built-in Monitoring',
    icon: '📊',
    description: (
      <>
        Observability patterns, monitoring strategies, and performance engineering techniques for production-ready systems.
      </>
    ),
  },
  {
    title: 'Multi-Tenant Support',
    icon: '🏢',
    description: (
      <>
        Learn multi-tenancy patterns, data isolation strategies, and scalable architecture for SaaS and enterprise platforms.
      </>
    ),
  },
  {
    title: 'Cloud-Native Design',
    icon: '☁️',
    description: (
      <>
        Modern cloud architecture patterns, containerization strategies, and infrastructure-as-code practices for scalable deployments.
      </>
    ),
  },
];

function Feature({title, description, icon}: FeatureItem) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>{icon}</div>
      <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>Everything You Need to Start Simple and Scale to Complex Topics</Heading>
          <p className={styles.sectionSubtitle}>
            From beginner-friendly fundamentals to advanced enterprise patterns, ArchMan provides a comprehensive learning path that grows with your expertise and project complexity.
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
