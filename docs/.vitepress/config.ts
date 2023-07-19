import { defineConfig } from "vitepress";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { fileURLToPath } from "node:url";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue To Print",
  description: "Print Vue components in the browser",
  locales: {
    root: {
      label: "English",
      lang: "en-US",
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [{ text: "Home", link: "/" }],

        sidebar: [
          {
            text: "Introduction",
            items: [
              { text: "What vueToPrint did?", link: "/guide/introduction" },
              { text: "Getting Started", link: "/guide/get-started" }
            ]
          },
          {
            text: "Usage",
            items: [
              { text: "Basic Usage", link: "/guide/basic-usage" },
              // { text: "Advanced Usage", link: "/guide/advanced-usage" },
              { text: "API", link: "/guide/api" }
            ]
          },
          {
            text: "Other",
            items: [
              {
                text: "Common Pitfalls",
                link: "https://github.com/gregnb/react-to-print#common-pitfalls"
              },
              { text: "FAQ", link: "https://github.com/gregnb/react-to-print#faq" },
              { text: "Helpful Style Tips", link: "https://github.com/gregnb/react-to-print#faq" }
            ]
          }
        ],

        socialLinks: [{ icon: "github", link: "https://github.com/siaikin/vue-to-print" }]
      }
    },
    zh: {
      label: "简体中文",
      lang: "zh-CN",
      link: "/zh/",
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [{ text: "主页", link: "/zh/" }],

        sidebar: [
          {
            text: "介绍",
            items: [
              { text: "vueToPrint 是什么?", link: "/zh/guide/introduction" },
              { text: "入门指南", link: "/zh/guide/get-started" }
            ]
          },
          {
            text: "Usage",
            items: [
              { text: "基本用法", link: "/zh/guide/basic-usage" },
              // { text: "Advanced Usage", link: "/guide/advanced-usage" },
              { text: "API", link: "/zh/guide/api" }
            ]
          },
          {
            text: "其他",
            items: [
              {
                text: "常见陷阱",
                link: "https://github.com/gregnb/react-to-print#common-pitfalls"
              },
              { text: "常见问题", link: "https://github.com/gregnb/react-to-print#faq" },
              { text: "有用的样式技巧", link: "https://github.com/gregnb/react-to-print#faq" }
            ]
          }
        ],

        socialLinks: [{ icon: "github", link: "https://github.com/siaikin/vue-to-print" }]
      }
    }
  },
  vite: {
    plugins: [
      //@ts-ignore
      vueJsx()
    ],
    resolve: {
      alias: {
        "vue-to-print": fileURLToPath(new URL("../../src/main", import.meta.url))
      }
    }
  }
});
