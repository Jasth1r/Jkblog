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
      ],
      '/cs186/': [
        {
          text: 'CS186',
          items: [
            { text: 'Overview', link: '/cs186/' }
          ]
        }
      ],
      '/fundamentals/': [
        {
          text: 'CS Fundamentals',
          items: [
            { text: 'Overview', link: '/fundamentals/' }
          ]
        }
      ],
      '/mysql/': [
        {
          text: 'MySQL',
          items: [
            { text: 'Overview', link: '/mysql/' },
            { text: 'Aurora Architecture', link: '/mysql/aurora-architecture' }
          ]
        }
      ],
      '/mit-6824/': [
        {
          text: 'MIT 6.824',
          items: [
            { text: 'Overview', link: '/mit-6824/' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
    ],

    footer: {
      message: 'Built with VitePress',
      copyright: '© 2026 Jkblog'
    }
  }
})
