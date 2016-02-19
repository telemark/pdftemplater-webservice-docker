'use strict'

var fs = require('fs')
var Docxtemplater = require('docxtemplater')

function createDocument (options, callback) {
  if (!options) {
    return callback(new Error('Missing required input: options'))
  }
  if (!options.templateFilePath) {
    return callback(new Error('Missing required input: options.templateFilePath'))
  }
  if (!options.templateData) {
    return callback(new Error('Missing required input: options.templateData'))
  }
  if (!options.docFilePath) {
    return callback(new Error('Missing required input: options.docFilePath'))
  }

  var content = fs.readFileSync(options.templateFilePath, 'binary')
  var doc = new Docxtemplater(content)

  doc.setData(options.templateData)

  doc.render()

  var buf = doc.getZip().generate({type: 'nodebuffer'})

  fs.writeFileSync(options.docFilePath, buf)

  return callback(null, {status: 'File written'})
}

module.exports = createDocument
