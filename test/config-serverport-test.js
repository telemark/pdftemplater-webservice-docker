'use strict'

var tap = require('tap')
var testPort = '3000'
var config = require('../config')

tap.equal(config.SERVER_PORT, testPort, 'SERVER_PORT default is ' + testPort)
