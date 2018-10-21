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

// save movies to db
var saveArrOfMoviesToDB = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(arr, ctx) {
    var _this = this;

    var Movie;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            Movie = ctx.models.Movie;
            _context3.next = 3;
            return Promise.all(arr.map(function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(item) {
                var movie, newMovie;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return Movie.findOne({ kp_id: item.kp_id });

                      case 2:
                        movie = _context2.sent;

                        if (movie) {
                          _context2.next = 10;
                          break;
                        }

                        newMovie = new Movie({
                          name: item.name,
                          origname: item.origname,
                          director: item.director,
                          year: item.year,
                          release_date: item.release_date,
                          country: item.country,
                          genre: item.genre,
                          slogan: item.slogan,
                          time: item.time,
                          kp_id: item.kp_id,
                          raiting_imdb: item.raiting_imdb,
                          raiting_kp: item.raiting_kp,
                          age: item.age,
                          kp_url: item.kp_url,
                          imdb_href: item.imdb_href,
                          hdrezka_url: item.hdrezka_url,
                          movie_url: item.movie_url,
                          mini_picture: item.mini_picture,
                          max_picture: item.max_picture,
                          actors: item.actors,
                          desc: item.desc
                        });
                        _context2.next = 7;
                        return newMovie.save();

                      case 7:
                        console.log('success');
                        _context2.next = 11;
                        break;

                      case 10:
                        console.log('already exists');

                      case 11:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this);
              }));

              return function (_x4) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function saveArrOfMoviesToDB(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

// get movies from api


var getMoviesFromApi = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(url) {
    var movies, response, dataFromRes, sortedMoviesStep1, sortedMoviesStep2, sortedMoviesStep3;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            movies = [];
            _context4.next = 4;
            return _axios2.default.get(url);

          case 4:
            response = _context4.sent;
            dataFromRes = response.data;
            _context4.next = 8;
            return dataFromRes.map(function (item) {
              movies.push(item);
            });

          case 8:
            sortedMoviesStep1 = _lodash2.default.uniqBy(movies, "kinopoisk_id");
            sortedMoviesStep2 = _lodash2.default.uniqBy(sortedMoviesStep1, "url");
            sortedMoviesStep3 = _lodash2.default.uniqBy(sortedMoviesStep2, "name");
            return _context4.abrupt('return', sortedMoviesStep3);

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4['catch'](0);

            console.log(_context4.t0);

          case 17:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 14]]);
  }));

  return function getMoviesFromApi(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

//post&getcloudinary link for picture


var fetchPictureToCloudinary = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(picture) {
    var cnf, result, $, cloud_link;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            cnf = (0, _confing2.default)();

            _cloudinary2.default.config({
              cloud_name: cnf.cloudinary.name,
              api_key: cnf.cloudinary.key,
              api_secret: cnf.cloudinary.secret
            });

            result = _cloudinary2.default.image(picture, { type: 'fetch' });
            $ = _cheerio2.default.load(result);
            cloud_link = $(result).attr().src;
            return _context5.abrupt('return', cloud_link);

          case 6:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function fetchPictureToCloudinary(_x6) {
    return _ref5.apply(this, arguments);
  };
}();

// parse imdb search page


var parseIMDBSearchPage = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(name) {
    var requestUrl, imdb_main_href, body, $, target, imdb_href;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            requestUrl = 'http://www.imdb.com/find?q=' + name + '&s=tt&ttype=ft&ref_=fn_ft';
            imdb_main_href = 'https://www.imdb.com';
            _context6.next = 5;
            return _axios2.default.get(requestUrl).then(function (res) {
              return res.data;
            });

          case 5:
            body = _context6.sent;
            $ = _cheerio2.default.load(body);
            _context6.next = 9;
            return $('.findSection > .findList > tbody > tr > td').children();

          case 9:
            target = _context6.sent;
            imdb_href = imdb_main_href + target[0].attribs.href;
            return _context6.abrupt('return', imdb_href);

          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6['catch'](0);
            return _context6.abrupt('return', 'nopage');

          case 17:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this, [[0, 14]]);
  }));

  return function parseIMDBSearchPage(_x7) {
    return _ref6.apply(this, arguments);
  };
}();

// parse page with movie


var parsePage = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(url) {
    var movie_info, resp, body, $, infoBlock, actors, name, origname, max_picture, mini_picture, desc, imdb_href;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            movie_info = {};
            _context7.next = 3;
            return _axios2.default.get(url);

          case 3:
            resp = _context7.sent;
            body = resp.data;
            $ = _cheerio2.default.load(body);
            infoBlock = $('.b-post__infotable_right > div > table > tbody').children().toArray();
            actors = $('.b-post__info > tbody > tr').children().last().text().replace('В ролях актеры:', ' ').trim();
            _context7.next = 10;
            return infoBlock.map(function (item) {
              var itemChildren = $(item).children().toArray();
              var firstItem = $(itemChildren[0]).text().trim();

              if (firstItem === 'Рейтинги:') {
                var raiting = $(itemChildren[1]).children().toArray();
                raiting.map(function (rateItem) {
                  if (rateItem.attribs.class == 'b-post__info_rates imdb') {
                    var raiting_imdb = $(rateItem).find('span').text().trim();
                    movie_info.raiting_imdb = raiting_imdb;
                  }
                  if (rateItem.attribs.class == 'b-post__info_rates kp') {
                    var raiting_kp = $(rateItem).find('span').text().trim();
                    movie_info.raiting_kp = raiting_kp;
                  }
                });
              }

              if (firstItem === 'Слоган:') {
                var slogan = $(itemChildren[1]).text().trim();
                movie_info.slogan = slogan;
              }

              if (firstItem === 'Дата выхода:') {
                var release_date = $(itemChildren[1]).text().trim();
                movie_info.release_date = release_date;
              }

              if (firstItem === 'Страна:') {
                var country = $(itemChildren[1]).text().trim();
                movie_info.country = country;
              }

              if (firstItem === 'Режиссер:') {
                var director = $(itemChildren[1]).text().trim();
                movie_info.director = director;
              }

              if (firstItem === 'Жанр:') {
                var genre = $(itemChildren[1]).text().trim();
                movie_info.genre = genre;
              }

              if (firstItem === 'Возраст:') {
                var age = $(itemChildren[1]).text().trim();
                movie_info.age = age;
              }

              if (firstItem === 'Время:') {
                var time = $(itemChildren[1]).text().trim();
                movie_info.time = time;
              }
            });

          case 10:
            name = $('.b-content__main > .b-post__title > h1').text().trim();
            origname = $('.b-content__main > .b-post__origtitle ').text().trim();
            max_picture = $('.b-post__infotable_left > div > div > a').attr().href;
            mini_picture = $('.b-post__infotable_left > div > div > a > img').attr().src;
            desc = $('.b-content__main > .b-post__description > .b-post__description_text').text().trim();
            _context7.next = 17;
            return parseIMDBSearchPage(origname);

          case 17:
            imdb_href = _context7.sent;


            movie_info.imdb_href = imdb_href;
            movie_info.name = name;
            movie_info.origname = origname;
            movie_info.max_picture = max_picture;
            movie_info.mini_picture = mini_picture;
            movie_info.hdrezka_url = url;
            movie_info.actors = actors;
            movie_info.desc = desc;

            return _context7.abrupt('return', movie_info);

          case 27:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function parsePage(_x8) {
    return _ref7.apply(this, arguments);
  };
}();

// parse hdrezka


var parseHdrezka = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(movies, url) {
    var _this2 = this;

    var conf, arrOfHrefs, resp, body, $, target, targetToArr, results, arrWithMovies, updatedArrWithMovies;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            conf = (0, _confing2.default)();
            arrOfHrefs = [];
            _context12.next = 5;
            return _axios2.default.get(url);

          case 5:
            resp = _context12.sent;
            body = resp.data;
            _context12.next = 9;
            return _cheerio2.default.load(body);

          case 9:
            $ = _context12.sent;
            target = $('.b-content__inline_items').children();
            targetToArr = target.toArray();
            _context12.next = 14;
            return targetToArr.map(function (item) {
              if (item.attribs.class === 'b-content__inline_item') {
                var itemBody = _cheerio2.default.load(item);
                var item_url = itemBody('.b-content__inline_item-cover > a').attr().href;
                arrOfHrefs.push(item_url);
              }
            });

          case 14:
            _context12.next = 16;
            return Promise.all(arrOfHrefs.map(function () {
              var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(item) {
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        return _context8.abrupt('return', parsePage(item));

                      case 1:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                }, _callee8, _this2);
              }));

              return function (_x11) {
                return _ref9.apply(this, arguments);
              };
            }()));

          case 16:
            results = _context12.sent;
            arrWithMovies = [];
            _context12.next = 20;
            return Promise.all(results.map(function () {
              var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(item1) {
                return _regenerator2.default.wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.next = 2;
                        return Promise.all(movies.map(function () {
                          var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(item2) {
                            var kp_url, movieEl;
                            return _regenerator2.default.wrap(function _callee9$(_context9) {
                              while (1) {
                                switch (_context9.prev = _context9.next) {
                                  case 0:
                                    if (!(item1.name == item2.name)) {
                                      _context9.next = 7;
                                      break;
                                    }

                                    kp_url = conf.kinopoisk.url + '/' + item2.kinopoisk_id;
                                    _context9.next = 4;
                                    return (0, _extends3.default)({}, item1, { year: item2.year, kp_id: item2.kinopoisk_id, movie_url: item2.url, kp_url: kp_url });

                                  case 4:
                                    movieEl = _context9.sent;
                                    _context9.next = 7;
                                    return arrWithMovies.push(movieEl);

                                  case 7:
                                  case 'end':
                                    return _context9.stop();
                                }
                              }
                            }, _callee9, _this2);
                          }));

                          return function (_x13) {
                            return _ref11.apply(this, arguments);
                          };
                        }()));

                      case 2:
                      case 'end':
                        return _context10.stop();
                    }
                  }
                }, _callee10, _this2);
              }));

              return function (_x12) {
                return _ref10.apply(this, arguments);
              };
            }()));

          case 20:
            updatedArrWithMovies = [];
            _context12.next = 23;
            return Promise.all(arrWithMovies.map(function () {
              var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(item) {
                var mini_picture, max_picture, newItem;
                return _regenerator2.default.wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        _context11.next = 2;
                        return fetchPictureToCloudinary(item.mini_picture);

                      case 2:
                        mini_picture = _context11.sent;
                        _context11.next = 5;
                        return fetchPictureToCloudinary(item.max_picture);

                      case 5:
                        max_picture = _context11.sent;
                        newItem = (0, _extends3.default)({}, item, { mini_picture: mini_picture, max_picture: max_picture });

                        updatedArrWithMovies.push(newItem);

                      case 8:
                      case 'end':
                        return _context11.stop();
                    }
                  }
                }, _callee11, _this2);
              }));

              return function (_x14) {
                return _ref12.apply(this, arguments);
              };
            }()));

          case 23:
            return _context12.abrupt('return', updatedArrWithMovies);

          case 26:
            _context12.prev = 26;
            _context12.t0 = _context12['catch'](0);

            console.log(_context12.t0);

          case 29:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, this, [[0, 26]]);
  }));

  return function parseHdrezka(_x9, _x10) {
    return _ref8.apply(this, arguments);
  };
}();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _confing = require('./confing');

var _confing2 = _interopRequireDefault(_confing);

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              // const cfg = getConfig()
              // const prodRepeat = 1000 * 3600 * 12
              // const devRepeat = 15000
              // const movies = await getMoviesFromApi(cfg.moviesAPI.url)

              // let counter = 1

              // const timerId = await setInterval(async() => {
              //   console.log(`${cfg.hdrezka.url}/page/${counter}`)
              //   const result = await parseHdrezka(movies, `${cfg.hdrezka.url}/page/${counter}`)
              //   await saveArrOfMoviesToDB(result, ctx)
              //   // counter++

              //   // if (counter === 20) {
              //   //   clearInterval(timerId)
              //   //   console.log(`DONE ${counter} times`)
              //   // }

              // }, prodRepeat)

            } catch (error) {
              console.log(error);
            }

          case 1:
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