import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "NMackLee",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Tektur",
        body: "Share Tech Mono",
        code: "Kode Mono",
      },
      colors: {
        lightMode: {
          light: "#f4f5f7", // Clean off-white, like mobile suit armor
          lightgray: "#cdd3dc", // Panel lines and soft borders (cool gray)
          gray: "#a0a8b2", // Stronger gray for graph links and heavy UI elements
          darkgray: "#3d4753", // Body text, cockpit console gray
          dark: "#111827", // Headers/icons, black paint & panel markings
          secondary: "#0070f3", // Federation sensor blue, link color
          tertiary: "#ff2e63", // Warning light pink/red, hover/visited
          highlight: "#e6f7ff", // Light blue sensor glow for code + internal links
          textHighlight: "#fffbe6",
        },
        darkMode: {
          light: "#0e0f11", // Near-black with a hint of green decay
          lightgray: "#2b2d30", // Muted steel for borders
          gray: "#44474a", // Heavy border + graph links, oxidized dark iron
          darkgray: "#8b8f93", // Body text, like worn concrete
          dark: "#d7dadc", // Headers/icons, bright but soft neutral
          secondary: "#68d391", // Soft bioluminescent green (links, graph focus)
          tertiary: "#c084fc", // Violet glow for hover/visited, dreamy tech
          highlight: "#264d3d", // Faint forest green background highlight
          textHighlight: "#373e2f",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
