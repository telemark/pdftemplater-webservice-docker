'use strict'

var tap = require('tap')
var testPort = '8000'
process.env.SERVER_PORT = testPort
var config = require('../config')

tap.equal(config.SERVER_PORT, testPort, 'It supports SERVER_PORT through env')
