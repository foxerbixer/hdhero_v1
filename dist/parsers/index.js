'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _require, _require2;

  return {
    parseGidonline: (_require = require('./gidonline')).default.apply(_require, arguments),
    parseHdrezka: (_require2 = require('./hdrezka')).default.apply(_require2, arguments)
  };
};