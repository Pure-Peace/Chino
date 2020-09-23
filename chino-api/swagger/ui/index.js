const path = require('path')
const fs = require('fs')
const express = require('express')
const config = require('../../../config').default

module.exports = function swaggerUi (options) {
  options = options || {}
  const router = new express.Router()

  router.get('/', function (req, res) {
    const template = path.resolve(__dirname, 'static/index.html')
    let html = fs.readFileSync(template, 'UTF-8')
    html = html
      .replace(/\{\{TITLE\}\}/ig, (config.chino_api.title || 'Swagger UI'))
      .replace(/\{\{BASE\}\}/ig, (options.basePath || ''))
      .replace(/\{\{ROUTE\}\}/ig, (options.route || 'docs'))
      .replace(/\{\{DOCS\}\}/ig, (options.docs || 'swagger-docs.json'))
    res.send(html)
  })

  router.use(express.static(path.resolve(__dirname, 'static')))

  return router
}
