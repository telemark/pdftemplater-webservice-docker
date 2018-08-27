'use strict'

var config = {
  SERVER_PORT: process.env.SERVER_PORT || '3000',
  GCS_STORAGE_BUCKET_NAME: process.env.GCS_STORAGE_BUCKET_NAME,
  GCS_TEMPLATE_BUCKET_NAME: process.env.GCS_TEMPLATE_BUCKET_NAME,
}

module.exports = config
