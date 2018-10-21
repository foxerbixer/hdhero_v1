'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getMoviesAndSaveToFB = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx) {
    var _this = this;

    var Movie, db, ref, moviesRef, movies_raw, movies;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            Movie = ctx.models.Movie;
            _context3.next = 4;
            return _firebaseAdmin2.default.initializeApp({
              credential: _firebaseAdmin2.default.credential.cert(_hdherokimaFirebaseAdminsdkHv33c76842102ed2.default),
              databaseURL: "https://hdherokima.firebaseio.com"
            });

          case 4:
            _context3.next = 6;
            return _firebaseAdmin2.default.database();

          case 6:
            db = _context3.sent;
            _context3.next = 9;
            return db.ref('/movies');

          case 9:
            ref = _context3.sent;
            moviesRef = ref.child("all-movies");
            _context3.next = 13;
            return Movie.find();

          case 13:
            movies_raw = _context3.sent;
            _context3.next = 16;
            return Promise.all(movies_raw.slice(9, 1000).map(function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(item) {
                var genres, entity, newItem, movieItem;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return getKeysForGenres(item.genre);

                      case 2:
                        genres = _context2.sent;
                        entity = (0, _extends3.default)({}, item._doc);
                        newItem = _lodash2.default.omit(entity, ['createdAt', 'updatedAt', '__v', '_id']);
                        movieItem = (0, _extends3.default)({}, newItem, genres);
                        return _context2.abrupt('return', movieItem);

                      case 7:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this);
              }));

              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 16:
            movies = _context3.sent;
            _context3.next = 19;
            return movies.map(function (movie) {
              moviesRef.orderByChild("kp_id").equalTo(+movie.kp_id).once('value', function (snapshot) {
                if (!snapshot.exists()) {
                  moviesRef.push(movie);
                }
              });
            });

          case 19:
            _context3.next = 24;
            break;

          case 21:
            _context3.prev = 21;
            _context3.t0 = _context3['catch'](0);

            console.log(_context3.t0);

          case 24:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 21]]);
  }));

  return function getMoviesAndSaveToFB(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getKeysForGenres = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(genre) {
    var genres, reg_western, reg_art, reg_crime, reg_fantastic, reg_horror, reg_ero, reg_shorts, reg_family, reg_action, reg_adventure, reg_comedy, reg_musical, reg_childish, reg_ours, reg_fantasy, reg_military, reg_drama, reg_melodrama, reg_history, reg_travels, reg_ukr, reg_biographical, reg_detective, reg_sport, reg_triller, reg_documentary, reg_informative, reg_foreign;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            genres = {};
            reg_western = /Вестерны/;
            reg_art = /Арт-хаус/;
            reg_crime = /Криминал/;
            reg_fantastic = /Фантастика/;
            reg_horror = /Ужасы/;
            reg_ero = /Эротика/;
            reg_shorts = /Короткометражные/;
            reg_family = /Семейные/;
            reg_action = /Боевики/;
            reg_adventure = /Приключения/;
            reg_comedy = /Комедии/;
            reg_musical = /Мьюзиклы/;
            reg_childish = /Детские/;
            reg_ours = /Наши/;
            reg_fantasy = /Фэнтези/;
            reg_military = /Военные/;
            reg_drama = /Драмы/;
            reg_melodrama = /Мелодрамы/;
            reg_history = /Исторические/;
            reg_travels = /Путешествия/;
            reg_ukr = /Украинские/;
            reg_biographical = /Биографические/;
            reg_detective = /Детективы/;
            reg_sport = /Спортивные/;
            reg_triller = /Триллеры/;
            reg_documentary = /Документальные/;
            reg_informative = /Познавательные/;
            reg_foreign = /Зарубежные/;


            if (reg_western.test(genre)) {
              genres.key_western = 'Вестерны';
            }
            if (reg_art.test(genre)) {
              genres.key_art = 'Арт-хаус';
            }
            if (reg_crime.test(genre)) {
              genres.key_crime = 'Криминал';
            }
            if (reg_fantastic.test(genre)) {
              genres.key_fantastic = 'Фантастика';
            }
            if (reg_horror.test(genre)) {
              genres.key_horror = 'Ужасы';
            }
            if (reg_ero.test(genre)) {
              genres.key_ero = 'Эротика';
            }
            if (reg_shorts.test(genre)) {
              genres.key_shorts = 'Короткометражные';
            }
            if (reg_family.test(genre)) {
              genres.key_family = 'Семейные';
            }
            if (reg_action.test(genre)) {
              genres.key_action = 'Боевики';
            }
            if (reg_adventure.test(genre)) {
              genres.key_adventure = 'Приключения';
            }
            if (reg_comedy.test(genre)) {
              genres.key_comedy = 'Комедии';
            }
            if (reg_musical.test(genre)) {
              genres.key_musical = 'Мьюзиклы';
            }
            if (reg_childish.test(genre)) {
              genres.key_childish = 'Детские';
            }
            if (reg_ours.test(genre)) {
              genres.key_ours = 'Наши';
            }
            if (reg_fantasy.test(genre)) {
              genres.key_fantasy = 'Фэнтези';
            }
            if (reg_military.test(genre)) {
              genres.key_military = 'Военные';
            }
            if (reg_drama.test(genre)) {
              genres.key_drama = 'Драмы';
            }
            if (reg_melodrama.test(genre)) {
              genres.key_melodrama = 'Мелодрамы';
            }
            if (reg_history.test(genre)) {
              genres.key_history = 'Исторические';
            }
            if (reg_travels.test(genre)) {
              genres.key_travels = 'Путешествия';
            }
            if (reg_ukr.test(genre)) {
              genres.key_ukr = 'Украинские';
            }
            if (reg_biographical.test(genre)) {
              genres.key_biographical = 'Биографические';
            }
            if (reg_detective.test(genre)) {
              genres.key_detective = 'Детективы';
            }
            if (reg_sport.test(genre)) {
              genres.key_sport = 'Спортивные';
            }
            if (reg_triller.test(genre)) {
              genres.key_triller = 'Триллеры';
            }
            if (reg_documentary.test(genre)) {
              genres.key_documentary = 'Документальные';
            }
            if (reg_informative.test(genre)) {
              genres.key_informative = 'Познавательные';
            }
            if (reg_foreign.test(genre)) {
              genres.key_foreign = 'Зарубежные';
            }

            return _context4.abrupt('return', genres);

          case 61:
            _context4.prev = 61;
            _context4.t0 = _context4['catch'](0);

            console.log(_context4.t0);

          case 64:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 61]]);
  }));

  return function getKeysForGenres(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var deleteAllMovies = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
    var db, ref;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _firebaseAdmin2.default.database();

          case 2:
            db = _context5.sent;
            _context5.next = 5;
            return db.ref('/movies');

          case 5:
            ref = _context5.sent;
            _context5.next = 8;
            return ref.child("all-movies").remove();

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function deleteAllMovies() {
    return _ref5.apply(this, arguments);
  };
}();

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

var _hdherokimaFirebaseAdminsdkHv33c76842102ed = require('./hdherokima-firebase-adminsdk-hv33c-76842102ed.json');

var _hdherokimaFirebaseAdminsdkHv33c76842102ed2 = _interopRequireDefault(_hdherokimaFirebaseAdminsdkHv33c76842102ed);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();