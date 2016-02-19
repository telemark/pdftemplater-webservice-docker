'use strict'

var fs = require('fs')
var uuid = require('uuid')
var unoconv = require('unoconv2')
var createDocument = require('../lib/create-document')

function showFrontpage (request, reply) {
  reply({
    message: 'Only POST is supported'
  })
}

function handleUpload (request, reply) {
  var data = request.payload
  if (data.file) {
    var nameArray = data.file.hapi.filename.split('.')
    var newNameConverted = nameArray.join('.') + '.formatted.pdf'
    var temporaryName = uuid.v4()
    var pathPre = process.cwd() + '/uploads/' + temporaryName
    var fileNameTempOriginal = pathPre + '.original.docx'
    var fileNameTempConverted = pathPre + '.formatted.docx'
    var fileNameTempPdfConverted = pathPre + '.formatted.pdf'
    var file = fs.createWriteStream(fileNameTempOriginal)

    file.on('error', function (error) {
      reply(error)
    })

    data.file.pipe(file)

    file.on('finish', function (err) {
      if (err) {
        reply(err)
      } else {
        delete data['file']
        var options = {
          templateFilePath: fileNameTempOriginal,
          templateData: data,
          docFilePath: fileNameTempConverted
        }
        createDocument(options, function (err, result) {
          if (err) {
            reply(err)
          } else {
            unoconv.convert(fileNameTempConverted, 'pdf', function (err, result) {
              if (err) {
                reply(err)
              } else {
                fs.writeFile(fileNameTempPdfConverted, result, function (err) {
                  if (err) {
                    reply(err)
                  } else {
                    reply.file(fileNameTempPdfConverted, {
                      filename: newNameConverted
                    }).on('finish', function () {
                      fs.unlink(fileNameTempOriginal)
                      fs.unlink(fileNameTempConverted)
                      fs.unlink(fileNameTempPdfConverted)
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  }
}

module.exports.showFrontpage = showFrontpage

module.exports.handleUpload = handleUpload
