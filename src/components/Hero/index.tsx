import clsx from 'clsx';
import styles from './styles.module.css';

interface HeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function Hero({
  title,
  subtitle,
  image,
  imageAlt = '',
  ctaText,
  ctaLink,
  className,
  size = 'medium'
}: HeroProps) {
  image = image || '/img/archman-social-card.webp';
  return (
    <div 
      className={clsx(styles.hero, styles[`hero--${size}`], className)}
    >
      {image && (
        <div 
          className={styles.hero__background}
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className={styles.hero__overlay} />
      <div className={styles.hero__content}>
        <div className={styles.hero__text}>
          <h1 className={styles.hero__title}>{title}</h1>
          {subtitle && (
            <p className={styles.hero__subtitle}>{subtitle}</p>
          )}
          {ctaText && ctaLink && (
            <a 
              href={ctaLink} 
              className={styles.hero__cta}
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
