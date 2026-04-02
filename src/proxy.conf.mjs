export default [
  {
    context: ['/track', '/engage'],
    target: 'https://api-eu.mixpanel.com/',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug'
  },
  {
    context: ['/products*'],
    target: 'https://localhost:7200/',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug'
  },
  {
    context: ['/realms'],
    target: 'http://localhost:8080',
    secure: false,
    logLevel: 'debug'
  }
];