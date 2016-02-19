'use strict'

var tap = require('tap')
var routes = require('../routes')

tap.equal(routes.length, 2, 'There are 2 different routes')
