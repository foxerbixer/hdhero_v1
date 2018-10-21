import firebase from 'firebase'
import { app_name } from '../../firebase/config'
import { take, put, all, call, select} from 'redux-saga/effects'
import { createSelector } from 'reselect'
import { Record, OrderedMap } from 'immutable'
import _ from 'lodash'
import { reset } from 'redux-form'

export const module_name = 'comments'
const ADD_COMMENT_REQUEST = `${app_name}/${module_name}/ADD_COMMENT_REQUEST`
const ADD_COMMENT_SUCCESS = `${app_name}/${module_name}/ADD_COMMENT_SUCCESS`
const GET_COMMENTS_REQUEST = `${app_name}/${module_name}/GET_COMMENTS_REQUEST`
const GET_COMMENTS_SUCCESS = `${app_name}/${module_name}/GET_COMMENTS_SUCCESS`
const DELETE_COMMENT_REQUEST = `${app_name}/${module_name}/DELETE_COMMENT_REQUEST`

const ReducerState = Record({
  entities: [],
  isLoading: false
})

const CommentState = Record({
  username: null,
  date: null,
  email: null,
  kp_id: null,
  profile_picture: null,
  text: null,
  uid: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action
  
  switch(type) {
    case ADD_COMMENT_REQUEST:
      return state.set('isLoading', true)
    case ADD_COMMENT_SUCCESS:
      return state.set('isLoading', false)
    case GET_COMMENTS_SUCCESS:
      return state.set('entities', payload)   
    default:
      return state
  }
}


//////////////
// reselect //
/////////////
const selectorState = state => state[module_name]
export const entitiesSelector = (createSelector(selectorState, state => state.entities))
export const commentsSelector = (createSelector(entitiesSelector, entities => (
  entities.valueSeq().toArray()
)))

/////////////
// actions //
/////////////
export const addComment = (comment) => ({
  type: ADD_COMMENT_REQUEST,
  payload: { comment }
})

export const getComments = (kp_id) => ({
  type: GET_COMMENTS_REQUEST,
  payload: { kp_id }
})

export const deleteComment = (text, kp_id) => ({
  type: DELETE_COMMENT_REQUEST,
  payload: { text, kp_id }
})

/////////////
// sagas ////
////////////
const addCommentSaga = function * () { 
  while(true) {
    try {
      const action = yield take(ADD_COMMENT_REQUEST)
      const { kp_id } = action.payload.comment
      const movieRef = yield firebase.database().ref('comments/' + kp_id)
  
      yield movieRef.push(action.payload.comment)
      
      yield put({
        type: ADD_COMMENT_SUCCESS
      })

      yield put(reset('comment'))
    } catch(error) {}
  }
}

const getCommentsSaga = function * () {
  while(true) {
    try {
      const action = yield take(GET_COMMENTS_REQUEST)
    
      const movieRef = yield firebase.database().ref('comments').orderByKey().equalTo(action.payload.kp_id)
      const commentsRaw = yield call([movieRef, movieRef.once], 'value')
      const commenstsItems = _.toArray(commentsRaw.val())
      const comments = _.toArray(commenstsItems[0])
      
      yield put({
        type: GET_COMMENTS_SUCCESS,
        payload: comments
      })

    } catch(error){}
  }
}

const deleteCommentSaga = function * () {
  while(true) {
    try {
      const action = yield take(DELETE_COMMENT_REQUEST)
      const { text, kp_id} = action.payload

      const comRef = yield firebase.database().ref('comments/' + kp_id)
  
      comRef.orderByChild('text').equalTo(text).on('child_added', snapshot => {
       snapshot.ref.remove()
     })
 
  
     
    } catch(error){}
  }
}

export const saga = function * () {
  yield all([
    addCommentSaga(),
    getCommentsSaga(),
    deleteCommentSaga()
  ])
}