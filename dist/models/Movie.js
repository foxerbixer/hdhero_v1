'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

exports.default = function (ctx) {
  var MovieSchema = new Schema({
    name: {
      type: String,
      requiered: true
    },
    origname: {
      type: String
    },
    director: {
      type: String
    },
    mini_picture: {
      type: String,
      required: true
    },
    max_picture: {
      type: String
    },
    movie_url: {
      type: String,
      required: true
    },
    year: {
      type: String
    },
    release_date: {
      type: String
    },
    country: {
      type: String
    },
    genre: {
      type: String
    },
    age: {
      type: String
    },
    actors: {
      type: String
    },
    slogan: {
      type: String
    },
    time: {
      type: String
    },
    kp_id: {
      type: String,
      required: true
    },
    kp_url: {
      type: String
    },
    hdrezka_url: {
      type: String
    },
    imdb_href: {
      type: String
    },
    raiting_imdb: {
      type: String
    },
    raiting_kp: {
      type: String
    },
    desc: {
      type: String
    }
  }, {
    collection: 'movie',
    timestamps: true
  });

  MovieSchema.methods.toJSON = function () {
    return _lodash2.default.pick(this, ['name', 'origname', 'director', 'year', 'release_date', 'country', 'genre', 'slogan', 'time', 'kp_id', 'raiting_imdb', 'raiting_kp', 'age', 'kp_url', 'imdb_href', 'hdrezka_url', 'movie_url', 'mini_picture', 'max_picture', 'actors']);
  };

  return _mongoose2.default.model('Movie', MovieSchema);
};