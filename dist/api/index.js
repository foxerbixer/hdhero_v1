'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _arguments = arguments;

exports.default = function () {
  var _require, _require2;

  return {
    defaultRoute: (_require = require('./default-route')).default.apply(_require, _arguments),
    allMovies: (_require2 = require('./all-movies')).default.apply(_require2, _arguments)
  };
};