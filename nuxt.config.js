export default {
  server: {
    host: '0.0.0.0', // default: localhost
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '环境监测系统',
    htmlAttrs: {
      lang: 'zh-CN',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '基于EMQ的环境监测存储系统',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['balm-ui/dist/balm-ui.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/balm-ui'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
  },

  // Axios Configuration (https://axios.nuxtjs.org/options/)
  axios: {
    proxy: true,
    prefix: '/api',
    credentials: true,
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:5005',
      pathRewrite: {
        changeOrigin: true,
      },
    },
  },
}
