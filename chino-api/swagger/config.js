const config = require('../../config').default

module.exports = {
  route: {
    basePath: config.chino_api.base_path,
    url: '/',
    docs: '/swagger-docs.json'
  },
  swaggerDefinition: {
    info: {
      description: config.chino_api.description,
      title: config.chino_api.title,
      version: config.chino_api.version
    },
    basePath: config.chino_api.base_path,
    produces: [
      'application/json',
      'application/xml'
    ],
    schemes: ['http', 'https']
  },
  basedir: __dirname, // app absolute path
  files: ['../routes/**/*.js'] // Path to the API handle folder
}
