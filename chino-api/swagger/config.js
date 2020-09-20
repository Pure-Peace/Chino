const config = require('../../config').default

module.exports = {
  route: {
    basePath: config.chinoApi.BASE_PATH,
    url: '/docs',
    docs: '/swagger-docs.json'
  },
  swaggerDefinition: {
    info: {
      description: config.chinoApi.DESCRIPTION,
      title: config.chinoApi.TITLE,
      version: config.chinoApi.VERSION
    },
    host: `${config.server.host}:${config.server.port}`,
    basePath: config.chinoApi.BASE_PATH,
    produces: [
      'application/json',
      'application/xml'
    ],
    schemes: ['http', 'https']
  },
  basedir: __dirname, // app absolute path
  files: ['../routes/**/*.js'] // Path to the API handle folder
}
