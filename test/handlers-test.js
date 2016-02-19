'use strict'

var tap = require('tap')
var handlers = require('../handlers')

tap.equal(Object.keys(handlers).length, 2, 'There are 2 different handlers')

tap.ok(handlers.showFrontpage, 'Handler has method showFrontpage')

tap.ok(handlers.handleUpload, 'Handler has method handleUpload')
