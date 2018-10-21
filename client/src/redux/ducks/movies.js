import { Record, OrderedMap, OrderedSet } from 'immutable'
import firebase from 'firebase'
import { take, put, all, call, select} from 'redux-saga/effects'
import { createSelector } from 'reselect'
import { app_name } from '../../firebase/config'
import { tranformFbData, findMovieThatClientMeans } from './helpers'
import _ from 'lodash'
import { push } from 'connected-react-router'

export const module_name = 'movies'
export const GET_ALL_REQUEST = `${app_name}/${module_name}/GET_ALL_REQUEST`
export const GET_ALL_SUCCESS = `${app_name}/${module_name}/GET_ALL_SUCCESS`
export const GET_WESTERN_REQUEST = `${app_name}/${module_name}/GET_WESTERN_REQUEST`
export const GET_ART_REQUEST = `${app_name}/${module_name}/GET_ART_REQUEST`
export const GET_CRIME_REQUEST = `${app_name}/${module_name}/GET_CRIME_REQUEST`
export const GET_FANTASTIC_REQUEST = `${app_name}/${module_name}/GET_FANTASTIC_REQUEST`
export const GET_HORROR_REQUEST = `${app_name}/${module_name}/GET_HORROR_REQUEST`
export const GET_SHORTS_REQUEST = `${app_name}/${module_name}/GET_SHORTS_REQUEST`
export const GET_FAMILY_REQUEST = `${app_name}/${module_name}/GET_FAMILY_REQUEST`
export const GET_ACTION_REQUEST = `${app_name}/${module_name}/GET_ACTION_REQUEST`
export const GET_ADVENTURE_REQUEST = `${app_name}/${module_name}/GET_ADVENTURE_REQUEST`
export const GET_COMEDY_REQUEST = `${app_name}/${module_name}/GET_COMEDY_REQUEST`
export const GET_MUSICAL_REQUEST = `${app_name}/${module_name}/GET_MUSICAL_REQUEST`
export const GET_CHILDISH_REQUEST = `${app_name}/${module_name}/GET_CHILDISH_REQUEST`
export const GET_OURS_REQUEST = `${app_name}/${module_name}/GET_OURS_REQUEST`
export const GET_FANTASY_REQUEST = `${app_name}/${module_name}/GET_FANTASY_REQUEST`
export const GET_MILITARY_REQUEST = `${app_name}/${module_name}/GET_MILITARY_REQUEST`
export const GET_DRAMA_REQUEST = `${app_name}/${module_name}/GET_DRAMA_REQUEST`
export const GET_MELODRAMA_REQUEST = `${app_name}/${module_name}/GET_MELODRAMA_REQUEST`
export const GET_HISTORY_REQUEST = `${app_name}/${module_name}/GET_HISTORY_REQUEST`
export const GET_TRAVELS_REQUEST = `${app_name}/${module_name}/GET_TRAVELS_REQUEST`
export const GET_UKR_REQUEST = `${app_name}/${module_name}/GET_UKR_REQUEST`
export const GET_BIOGRAPHICAL_REQUEST = `${app_name}/${module_name}/GET_BIOGRAPHICAL_REQUEST`
export const GET_DETECTIVE_REQUEST = `${app_name}/${module_name}/GET_DETECTIVE_REQUEST`
export const GET_SPORT_REQUEST = `${app_name}/${module_name}/GET_SPORT_REQUEST`
export const GET_TRILLER_REQUEST = `${app_name}/${module_name}/GET_TRILLER_REQUEST`
export const GET_DOCUMENTARY_REQUEST = `${app_name}/${module_name}/GET_DOCUMENTARY_REQUEST`
export const GET_INFORMATIVE_REQUEST = `${app_name}/${module_name}/GET_INFORMATIVE_REQUEST`
export const GET_FOREIGN_REQUEST = `${app_name}/${module_name}/GET_FOREIGN_REQUEST`
export const GET_ALL_LAZY_REQUEST = `${app_name}/${module_name}/GET_ALL_LAZY_REQUEST`
export const GET_ALL_LAZY_START = `${app_name}/${module_name}/GET_ALL_LAZY_START`
export const GET_ALL_LAZY_SUCCESS = `${app_name}/${module_name}/GET_ALL_LAZY_SUCCESS`
export const SELECT_MOVIE = `${app_name}/${module_name}/SELECT_MOVIE`
export const SHOW_MOVIE_PAGE_START = `${app_name}/${module_name}/SHOW_MOVIE_PAGE_START`
export const SHOW_MOVIE_PAGE_SUCCESS = `${app_name}/${module_name}/SHOW_MOVIE_PAGE_SUCCESS`
export const GET_MOVIE_DESC_REQUEST = `${app_name}/${module_name}/GET_MOVIE_DESC_REQUEST`
export const GET_MOVIE_DESC_SUCCESS = `${app_name}/${module_name}/GET_MOVIE_DESC_SUCCESS`
export const GET_DESIRED_MOVIE_REQUEST = `${app_name}/${module_name}/GET_DESIRED_MOVIE_REQUEST`


const ReducerState = Record({
  entities: new OrderedMap({}),
  selected: new OrderedSet([]),
  movieDesc: null,
  isLoading: false,
  isLoaded: false
})

const MovieState = Record({
  name: null,
  origname: null,
  director: null,
  year: null,
  release_date: null,
  country: null,
  genre: null,
  slogan: null,
  time: null,
  kp_id: null,
  raiting_imdb: null,
  raiting_kp: null,
  age: null,
  kp_url: null,
  imdb_href: null,
  hdrezka_url: null,
  movie_url: null,
  mini_picture: null,
  max_picture: null,
  actors: null,
  desc: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action
  switch(type) {
    case GET_ALL_REQUEST:
    case GET_WESTERN_REQUEST:
    case GET_ART_REQUEST:
    case GET_CRIME_REQUEST:
    case GET_FANTASTIC_REQUEST:
    case GET_HORROR_REQUEST:
    case GET_SHORTS_REQUEST:
    case GET_FAMILY_REQUEST:
    case GET_ACTION_REQUEST:
    case GET_ADVENTURE_REQUEST:
    case GET_COMEDY_REQUEST:
    case GET_MUSICAL_REQUEST:
    case GET_CHILDISH_REQUEST:
    case GET_OURS_REQUEST:
    case GET_FANTASY_REQUEST:
    case GET_MILITARY_REQUEST:
    case GET_DRAMA_REQUEST:
    case GET_MELODRAMA_REQUEST:
    case GET_HISTORY_REQUEST:
    case GET_TRAVELS_REQUEST:
    case GET_UKR_REQUEST:
    case GET_BIOGRAPHICAL_REQUEST:
    case GET_DETECTIVE_REQUEST:
    case GET_SPORT_REQUEST:
    case GET_TRILLER_REQUEST:
    case GET_DOCUMENTARY_REQUEST:
    case GET_INFORMATIVE_REQUEST:
    case GET_FOREIGN_REQUEST:
    case GET_ALL_LAZY_START:
    case SHOW_MOVIE_PAGE_START: 
      return state.set('isLoading', true) 
    case GET_ALL_SUCCESS:
      return state
        .set('isLoaded', true)
        .set('entities', tranformFbData(payload, MovieState))
        .set('isLoading', false)
    case GET_ALL_LAZY_SUCCESS:
      return state
        .set('isLoading', false)
        .set('entities', tranformFbData(payload, MovieState))
        .set('isLoaded', Object.keys(payload).length < 14) 
    case SELECT_MOVIE:
      return state.selected.contains(payload) 
      ? state.update('selected', selected => selected.remove(payload)) 
      : state.update('selected', selected => selected.add(payload)) 
    case SHOW_MOVIE_PAGE_SUCCESS:
      return state.set('isLoading', false)
    case GET_MOVIE_DESC_SUCCESS:
      return state.set('movieDesc', payload.movie_desc)     
    default:
      return state
  }
}

//////////////
// reselect //
/////////////
const selectorState = state => state[module_name]
export const entitiesSelector = (createSelector(selectorState, state => state.entities))
export const moviesSelector = (createSelector(entitiesSelector, entities => (
  entities.valueSeq().toArray()
)))

// export const sectionSelector = createSelector(selectorState, state => state.selected)
// export const selectMovie = createSelector(entitiesSelector, sectionSelector, (entities, selection) => (
//     selection.toArray().map(uid => entities.get(uid))
// ))

export const selectedSelector = (createSelector(selectorState, state => state.selected))
export const movieSelector = (createSelector(selectedSelector, selected => (
  selected.valueSeq().toArray()
)))


/////////////
// actions //
/////////////
export const getMovies = () => ({
  type: GET_ALL_REQUEST
})

export const getWestern = () => ({
  type: GET_WESTERN_REQUEST
})

export const getArt = () => ({
  type: GET_ART_REQUEST
})

export const getCrime = () => ({
  type: GET_CRIME_REQUEST
})

export const getFantastic = () => ({
  type: GET_FANTASTIC_REQUEST
})

export const getHorror = () => ({
  type: GET_HORROR_REQUEST
})

export const getShorts = () => ({
  type: GET_SHORTS_REQUEST
})

export const getFamily = () => ({
  type: GET_FAMILY_REQUEST
})

export const getAction = () => ({
  type: GET_ACTION_REQUEST
})

export const getAdventure = () => ({
  type: GET_ADVENTURE_REQUEST
})

export const getComedy = () => ({
  type: GET_COMEDY_REQUEST
})

export const getMusical = () => ({
  type: GET_MUSICAL_REQUEST
})

export const getChildish = () => ({
  type: GET_CHILDISH_REQUEST
})

export const getOurs = () => ({
  type: GET_OURS_REQUEST
})

export const getFantasy = () => ({
  type: GET_FANTASY_REQUEST
})

export const getMilitary = () => ({
  type: GET_MILITARY_REQUEST
})

export const getDrama = () => ({
  type: GET_DRAMA_REQUEST
})

export const getMelodrama = () => ({
  type: GET_MELODRAMA_REQUEST
})

export const getHistory = () => ({
  type: GET_HISTORY_REQUEST
})

export const getTravels = () => ({
  type: GET_TRAVELS_REQUEST
})

export const getUkr = () => ({
  type: GET_UKR_REQUEST
})

export const getBiographical = () => ({
  type: GET_BIOGRAPHICAL_REQUEST
})

export const getDetective = () => ({
  type: GET_DETECTIVE_REQUEST
})

export const getSport = () => ({
  type: GET_SPORT_REQUEST
})

export const getTriller = () => ({
  type: GET_TRILLER_REQUEST
})

export const getDocumentary= () => ({
  type: GET_DOCUMENTARY_REQUEST
})

export const getInformative = () => ({
  type: GET_INFORMATIVE_REQUEST
})

export const getForeign = () => ({
  type: GET_FOREIGN_REQUEST
})

// export const getMoviesLazy = () => ({
//   type: GET_ALL_LAZY_REQUEST
// })

export const selectMovie = (uid, movie) => ({
  type: SELECT_MOVIE,
  payload: {...movie, uid}
})


export const showMoviePage = history => ({
  type: SHOW_MOVIE_PAGE_START,
  payload: { history }
})

export const getDesiredMovie = (name, history )=> ({
  type: GET_DESIRED_MOVIE_REQUEST,
  payload: { name, history }
})

// export const getMovieDesc = kp_id => ({
//   type: GET_MOVIE_DESC_REQUEST,
//   payload: { kp_id }
// })

/////////////
// sagas ////
////////////
export const getMoviesSaga = function * () {
  while(true) {
    yield take(GET_ALL_REQUEST)
    const allMoviesRef = firebase.database().ref('/movies').child("all-movies")

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val() 
    })
  }
}

const getWesternSaga = function * () {
  while(true) {
    yield take(GET_WESTERN_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_western').equalTo('Вестерны')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getArtSaga = function * () {
  while(true) {
    yield take(GET_ART_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_art').equalTo('Арт-хаус')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getCrimeSaga = function * () {
  while(true) {
    yield take(GET_CRIME_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_crime').equalTo('Криминал')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getFantasticSaga = function * () {
  while(true) {
    yield take(GET_FANTASTIC_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_fantastic').equalTo('Фантастика')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getHorrorSaga = function * () {
  while(true) {
    yield take(GET_HORROR_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_horror').equalTo('Ужасы')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getShortsSaga = function * () {
  while(true) {
    yield take(GET_SHORTS_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_shorts').equalTo('Короткометражные')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getFamilySaga = function * () {
  while(true) {
    yield take(GET_FAMILY_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_family').equalTo('Семейные')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getActionSaga = function * () {
  while(true) {
    yield take(GET_ACTION_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_action').equalTo('Боевики')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getAdventureSaga = function * () {
  while(true) {
    yield take(GET_ADVENTURE_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_adventure').equalTo('Приключения')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getComedySaga = function * () {
  while(true) {
    yield take(GET_COMEDY_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_comedy').equalTo('Комедии')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getMusicalSaga = function * () {
  while(true) {
    yield take(GET_MUSICAL_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_musical').equalTo('Мьюзиклы')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getChildishSaga = function * () {
  while(true) {
    yield take(GET_CHILDISH_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_childish').equalTo('Детские')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getOursSaga = function * () {
  while(true) {
    yield take(GET_OURS_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_ours').equalTo('Наши')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getFantasySaga = function * () {
  while(true) {
    yield take(GET_FANTASY_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_fantasy').equalTo('Фэнтези')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getMilitarySaga = function * () {
  while(true) {
    yield take(GET_MILITARY_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_military').equalTo('Военные')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getDramaSaga = function * () {
  while(true) {
    yield take(GET_DRAMA_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_drama').equalTo('Драмы')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getMelodramaSaga = function * () {
  while(true) {
    yield take(GET_MELODRAMA_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_melodrama').equalTo('Мелодрамы')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getHistorySaga = function * () {
  while(true) {
    yield take(GET_HISTORY_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_history').equalTo('Исторические')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getTravelsSaga = function * () {
  while(true) {
    yield take(GET_TRAVELS_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_travels').equalTo('Путешествия')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getUkrSaga = function * () {
  while(true) {
    yield take(GET_UKR_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_ukr').equalTo('Украинские')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getBiographicalSaga = function * () {
  while(true) {
    yield take(GET_BIOGRAPHICAL_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_biographical').equalTo('Биографические')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getDetectiveSaga = function * () {
  while(true) {
    yield take(GET_DETECTIVE_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_detective').equalTo('Детективы')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getSportSaga = function * () {
  while(true) {
    yield take(GET_SPORT_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_sport').equalTo('Спортивные')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getTrillerSaga = function * () {
  while(true) {
    yield take(GET_TRILLER_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_triller').equalTo('Триллеры')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getDocumentarySaga = function * () {
  while(true) {
    yield take(GET_DOCUMENTARY_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_documentary').equalTo('Документальные')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getInformativeSaga = function * () {
  while(true) {
    yield take(GET_INFORMATIVE_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_informative').equalTo('Познавательные')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getForeignSaga = function * () {
  while(true) {
    yield take(GET_FOREIGN_REQUEST)

    const allMoviesRef = firebase.database()
      .ref('/movies').child("all-movies")
      .orderByChild('key_foreign').equalTo('Зарубежные')

    const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
    yield put({
      type: GET_ALL_SUCCESS,
      payload: movies.val()
    })
  }
}

const getDesiredMovieSaga = function * () {
  while(true) {
    const action  = yield take(GET_DESIRED_MOVIE_REQUEST)
    const { name } = action.payload

   
    const allMoviesRef = firebase.database().ref('/movies').child("all-movies")
    // .orderByChild('name').equalTo(name)
    const desired_movie = yield call([allMoviesRef, allMoviesRef.once], 'value')
    
    const desiredByClient = yield findMovieThatClientMeans(desired_movie.val(), name)

    if (!(_.isEmpty(desiredByClient))) {
      yield put(push('/desired'))
      yield put({
        type: GET_ALL_SUCCESS,
        payload: desiredByClient
      })
    } 
  }
}




// export const getMoviesLazySaga = function * () {
//   while(true) {
//     yield take(GET_ALL_LAZY_REQUEST)
    
//     const state = yield select(selectorState)
    
//     if (state.isLoading) continue
//     yield put({
//       type: GET_ALL_LAZY_START 
//     })
//     const lastMovie = state.entities.last()
//     const ref = firebase.database().ref('/movies')
//     const allMoviesRef = ref.child("all-movies")
//       .orderByValue()
//       .limitToFirst(14)
//       .startAt(lastMovie) 
    
//     const movies = yield call([allMoviesRef, allMoviesRef.once], 'value')
   
//     yield put({
//       type: GET_ALL_LAZY_SUCCESS,
//       payload: movies.val()
//     })
//   }
// }


export const showMoviePageSaga = function * () {
  while(true) {
    const action = yield take(SHOW_MOVIE_PAGE_START)
    const { history } = action.payload
    yield history.push('/movie')
    yield put({
      type: SHOW_MOVIE_PAGE_SUCCESS
    })
  }
}

// export const getMovieDescSaga = function * () {
//   while(true) {
//    const action = yield take(GET_MOVIE_DESC_REQUEST)
//    const { kp_id } = action.payload

//    const movieRef = firebase.database().ref('/movies').child("all-movies")
//     .orderByChild('kp_id').equalTo(kp_id)
//    const movie = yield call([movieRef, movieRef.once], 'value')
//    const movie_item = movie.val()
//    const movie_arr = _.toArray(movie_item)
//    const movie_desc = _.pick(movie_arr[0], ['movie_desc'])
   
//    yield put({
//      type: GET_MOVIE_DESC_SUCCESS,
//      payload: movie_desc
//    })
//   }
// } 

export const saga = function * () {
  yield all([
    getMoviesSaga(),
    showMoviePageSaga(),
    getWesternSaga(),
    getArtSaga(),
    getCrimeSaga(),
    getFantasticSaga(),
    getHorrorSaga(),
    getShortsSaga(),
    getFamilySaga(),
    getActionSaga(),
    getAdventureSaga(),
    getComedySaga(),
    getMusicalSaga(),
    getChildishSaga(),
    getOursSaga(),
    getFantasySaga(),
    getMilitarySaga(),
    getDramaSaga(),
    getMelodramaSaga(),
    getHistorySaga(),
    getTravelsSaga(),
    getUkrSaga(),
    getBiographicalSaga(),
    getDetectiveSaga(),
    getSportSaga(),
    getTrillerSaga(),
    getDocumentarySaga(),
    getInformativeSaga(),
    getForeignSaga(),
    getDesiredMovieSaga()
  ])
}