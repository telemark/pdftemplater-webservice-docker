'use strict'

var handlers = require('../handlers')

var routes = [
  {
    method: 'POST',
    path: '/{path*}',
    handler: handlers.handleUpload,
    config: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data'
      }
    }
  },
  {
    method: 'GET',
    path: '/',
    handler: handlers.showFrontpage
  }
]

module.exports = routes
