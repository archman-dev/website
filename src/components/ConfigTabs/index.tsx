import CodeBlock from '@theme/CodeBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import React from 'react';
import styles from './styles.module.css';

type Snippets = Partial<{
  yaml: string;
  json: string;
  toml: string;
}>;

type Props = {
  title?: React.ReactNode;
  snippets: Snippets;
  fileNames?: Partial<{ yaml: string; json: string; toml: string }>;
};

export default function ConfigTabs({ title, snippets, fileNames }: Props) {
  const tabs = [
    { value: 'yaml', label: 'YAML', code: snippets.yaml, lang: 'yaml', file: fileNames?.yaml },
    { value: 'json', label: 'JSON', code: snippets.json, lang: 'json', file: fileNames?.json },
    { value: 'toml', label: 'TOML', code: snippets.toml, lang: 'toml', file: fileNames?.toml },
  ].filter((t) => t.code);

  if (!tabs.length) {
    return null;
  }

  return (
  <section className={styles.container}>
      {title ? <h3 className={styles.heading}>{title}</h3> : null}
      {(() => {
        const TabsCmp = Tabs as any;
        const TabItemCmp = TabItem as any;
        return (
      <TabsCmp
      >
            {tabs.map((t) => (
              <TabItemCmp key={t.value} value={t.value} label={t.label}>
                <CodeBlock
                  language={t.lang}
                  showLineNumbers
                  title={t.file}
                  children={t.code}
                />
              </TabItemCmp>
            ))}
          </TabsCmp>
        );
      })()}
    </section>
  );
}
