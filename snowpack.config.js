/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  mount: {
    public: {url: '/', static: true},
    src: {url: '/dist'},
  },
  plugins: [
      '@snowpack/plugin-svelte',
      '@snowpack/plugin-dotenv'
    ],
  routes: [
    // {
    //   "match": "routes",
    //   "src": ".*",
    //   "dest": "/index.html"
    // }
  ],
  optimize: {
    //bundle: true,
  },
  packageOptions: {
    //source: "remote"
  },
  devOptions: {
    secure: true,
    hostname: '0.0.0.0',
    open: 'none'
  },
  buildOptions: {
    htmlFragments: true
  },
  alias: {
    '@components': './src/components',
    '@public': './public',
    '@src': './src'
  }
};
