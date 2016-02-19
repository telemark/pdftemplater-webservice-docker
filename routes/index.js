'use strict'

var handlers = require('../handlers')

var routes = [
  {
    method: 'POST',
    path: '/',
    config: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data'
      },
      handler: handlers.handleUpload
    }
  },
  {
    method: 'GET',
    path: '/',
    handler: handlers.showFrontpage
  }
]

module.exports = routes
