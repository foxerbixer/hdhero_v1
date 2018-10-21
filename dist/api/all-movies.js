'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = function (ctx) {
  var _this = this;

  var api = (0, _expressAsyncRouter.AsyncRouter)();

  // ROUTE /api/movies/all-movies
  // DESC return array of movies
  // ACCESS Public
  api.get('/', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var movies;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _Movie2.default.find().then(function (result) {
                return result.slice(0, 10);
              });

            case 3:
              movies = _context.sent;
              _context.next = 6;
              return res.json(movies);

            case 6:
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](0);

              console.log(_context.t0);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 8]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  return api;
};

var _expressAsyncRouter = require('express-async-router');

var _Movie = require('../models/Movie');

var _Movie2 = _interopRequireDefault(_Movie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }