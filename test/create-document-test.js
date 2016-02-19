'use strict'

var tap = require('tap')
var createDocument = require('../lib/create-document')

tap.test('requires an options object', function (test) {
  var options = false
  var expectedErrorMessage = 'Missing required input: options'
  createDocument(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('requires options.templateFilePath too exist', function (test) {
  var options = {
    templateFilePath: false
  }
  var expectedErrorMessage = 'Missing required input: options.templateFilePath'
  createDocument(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})
