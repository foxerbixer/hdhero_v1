'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _arguments = arguments;

exports.default = function () {
  var _require, _require2;

  return {

    reqParser: (_require = require('./reqParser')).default.apply(_require, _arguments),
    compress: (_require2 = require('./compress')).default.apply(_require2, _arguments)

  };
};