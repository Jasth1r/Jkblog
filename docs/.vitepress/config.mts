import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Jkblog',
  description: 'A personal learning log',
  lang: 'en-US',
  base: '/Jkblog/',
  cleanUrls: false,

  themeConfig: {
    siteTitle: 'Jkblog',

    search: {
      provider: 'local'
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tech Sharing', link: '/tech/' },
      { text: 'Archive', link: '/archive' }
    ],

    sidebar: {
      '/tech/': [
        {
          text: 'Tech Sharing',
          items: [
            { text: 'Overview', link: '/tech/' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Jasth1r/Jkblog' }
    ],

    footer: {
      message: 'Built with VitePress',
      copyright: '© 2026 Jkblog'
    }
  }
})
