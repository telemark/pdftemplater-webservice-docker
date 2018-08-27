const fs = require('fs')
const storage = require('@google-cloud/storage')()

const Config = require('../config')

const storageBucket = storage.bucket(Config.GCS_STORAGE_BUCKET_NAME)
const templateBucket = storage.bucket(Config.GCS_TEMPLATE_BUCKET_NAME)

module.exports.uploadToGCS = async (pdfPath) => {
    await storageBucket.upload(pdfPath, {
        gzip: true,
        metadata: {
          cacheControl: 'public, max-age=31536000',
        }
    })
}

module.exports.getTemplatePath = async (templateId) => {
    const file = templateBucket.file(`templates/${templateId}` + '.docx')
    const destination = `/tmp/${templateId}.docx`
    const options = { destination }
    await file.download(options)
    return destination
}