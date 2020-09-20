/* eslint-disable no-unused-vars */
const express = require('express')
const createSwagger = require('./swagger')

// Create express instance
const app = express()
const swagger = createSwagger(app)

console.log('Chino API started!')

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
