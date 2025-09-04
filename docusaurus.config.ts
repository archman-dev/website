import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "ArchMan",
  tagline:
    "Learn software architecture from first principles to real-world systems.",
  favicon: "img/favicon.ico",

  headTags: [
    {
      tagName: "meta",
      attributes: {
        name: "algolia-site-verification",
        content: "752CD9023ECFB28B",
      },
    },
  ],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://archman.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "archman", // Usually your GitHub org/user name.
  projectName: "archman.dev", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/archman-dev/website/tree/main",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/archman-dev/website/tree/main",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-0FL65JLSQ0",
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  // Ensure a resilient GA setup: define a gtag stub early if the network script is blocked/slow
  clientModules: [require.resolve("./src/client/gtag-fallback.js")],

  plugins: [
    //   [
    //     "@easyops-cn/docusaurus-search-local",
    //     {
    // // whether to index docs pages (support multiple docs instances)
    // docsRouteBasePath: ["/docs", "/editing"],

    // // whether to index blog pages
    // blogRouteBasePath: "/blog",

    //       // whether to index static pages
    //       indexPages: true,

    //       // language of your documentation
    //       language: "en",

    //       // Highlight matched terms in search results
    //       highlightSearchTermsOnTargetPage: true,
    //     },
    //   ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "editing",
        path: "editing",
        routeBasePath: "editing",
        sidebarPath: require.resolve("./editing/sidebars.ts"),
        editUrl: "https://github.com/archman-dev/website/tree/main",
      },
    ],
  ],

  markdown: {
    mermaid: true,
  },
  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Architecture Manual",
      logo: {
        alt: "ArchMan Logo",
        src: "img/logo.png",
      },
      items: [
        {
          to: "/docs/welcome/",
          position: "left",
          label: "Learn",
        },
        { to: "/blog", label: "Blog", position: "left" },
        { to: "/editing/", label: "Editing", position: "left" },
        {
          href: "https://github.com/archman-dev",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
        hideable: true,
      },
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [{ label: "Start Here", to: "/docs/welcome/" }],
        },
        // {
        //   title: "Community",
        //   items: [
        //     {
        //       label: "Stack Overflow",
        //       href: "https://stackoverflow.com/questions/tagged/docusaurus",
        //     },
        //     {
        //       label: "Discord",
        //       href: "https://discordapp.com/invite/docusaurus",
        //     },
        //     { label: "X", href: "https://x.com/" },
        //   ],
        // },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ArchMan.dev. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["yaml", "toml"],
    },
    algolia: {
      // The application ID provided by Algolia
      appId: "LP3N4A03RL",

      // Public API key: it is safe to commit it
      apiKey: "b5c2ed99a88f5f2719696be254ba7282",

      indexName: "archman_dev_lp3n4a03rl_pages",

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      // externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      // replaceSearchResultPathname: {
      //   from: '/docs/', // or as RegExp: /\/docs\//
      //   to: '/',
      // },

      // Optional: Algolia search parameters
      // searchParameters: {
      //   facetFilters: ["language:en"],
      //   attributesToHighlight: [
      //     "title",
      //     "content",
      //     "description",
      //     "keywords",
      //     "url",
      //   ],
      // },

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: "search",

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: true,
    },
  } satisfies Preset.ThemeConfig,
  themes: ["@docusaurus/theme-mermaid"],
};

export default config;
