'use strict'

const fs = require('fs')
const uuid = require('uuid')
const unoconv = require('unoconv2')
const generateDocx = require('generate-docx')
const { uploadToGCS, getTemplatePath } = require('../helpers')

module.exports.showFrontpage = (request, reply) => {
  reply({
    message: 'Only POST is supported'
  })
}

module.exports.handleUpload = async (request, reply) => {
  var data = request.payload
  const templateId = data.templateId
  const fileNameTempOriginal = await getTemplatePath(templateId)
  var temporaryName = uuid.v4()
  var pathPre = process.cwd() + '/uploads/' + temporaryName
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
      delete data.templateId
      const options = {
        template: {
          filePath: fileNameTempOriginal,
          data: data
        },
        save: {
          filePath: fileNameTempConverted
        }
      }
      generateDocx(options, function (err, result) {
        if (err) {
          reply(err)
        } else {
          unoconv.convert(fileNameTempConverted, 'pdf', function (err, result) {
            if (err) {
              reply(err)
            } else {
              fs.writeFile(fileNameTempPdfConverted, result, async function (err) {
                if (err) {
                  reply(err)
                } else {
                  const { link } = await uploadToGCS(fileNameTempPdfConverted)
                  reply({ link }).on('finish', async () => {
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
