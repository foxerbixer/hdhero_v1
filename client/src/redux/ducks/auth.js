import firebase from 'firebase'
import { Record } from 'immutable'
import { put, take, call, all, cps, takeEvery } from 'redux-saga/effects'
import { app_name } from '../../firebase/config'
import { eventChannel } from 'redux-saga'
import { push } from 'connected-react-router'
import _ from 'lodash'

export const module_name = 'auth'
export const SIGN_UP_REQUEST = `${app_name}/${module_name}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${app_name}/${module_name}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${app_name}/${module_name}/SIGN_UP_ERROR`
export const SIGN_IN_REQUEST = `${app_name}/${module_name}/SIGN_IN_REQUEST`
export const SIGN_IN_SUCCESS = `${app_name}/${module_name}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${app_name}/${module_name}/SIGN_IN_ERROR`
export const SIGN_OUT_REQUEST = `${app_name}/${module_name}/SIGN_OUT_REQUEST`
export const SIGN_OUT_SUCCESS = `${app_name}/${module_name}/SIGN_OUT_SUCCESS`
export const SIGN_IN_WITH_GOOGLE = `${app_name}/${module_name}/SIGN_IN_WITH_GOOGLE`
export const CREATE_PROFILE_REQUEST = `${app_name}/${module_name}/CREATE_PROFILE_REQUEST`
export const CREATE_PROFILE_SUCCESS = `${app_name}/${module_name}/CREATE_PROFILE_SUCCESS`
export const GET_PROFILE_REQUEST = `${app_name}/${module_name}/GET_PROFILE_REQUEST`
export const GET_PROFILE_SUCCESS = `${app_name}/${module_name}/GET_PROFILE_SUCCESS`



const ReducerState = new Record({
  user: null,
  error: null,
  userinfo: null,
  isLoading: false
})


export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case SIGN_IN_REQUEST:
    case CREATE_PROFILE_REQUEST:
      return state.set('isLoading', true)
    
    case SIGN_IN_SUCCESS:
      return state
        .set('user', payload.user)
        .set('error', null)
        .set('isLoading', false)
      
        
    case SIGN_UP_ERROR:
    case SIGN_IN_ERROR:
      return state
        .set('error', payload.error) 
        .set('isLoading', false) 
        
    case SIGN_OUT_SUCCESS:
      return new ReducerState()
      
    case GET_PROFILE_SUCCESS:
      return state
        .set('userinfo', payload) 
        
    case CREATE_PROFILE_SUCCESS:
      return state.set('isLoading', false)    
   
    default:
      return state
  }
}



/////////////
// actions //
/////////////
export const signUp = (email, password) => ({
  type: SIGN_UP_REQUEST,
  payload: { email, password }
})

export const signIn = (email, password) => ({
  type: SIGN_IN_REQUEST,
  payload: { email, password }
})
//
export const signOut = () => ({
  type: SIGN_OUT_REQUEST
})

export const signInWithGoogle = () => ({
  type: SIGN_IN_WITH_GOOGLE
})

export const createProfile = (userId, ava, name, email ) => ({
  type: CREATE_PROFILE_REQUEST,
  payload: {userId, name, ava, email }
})

export const getProfile = (userId) => ({
  type: GET_PROFILE_REQUEST,
  payload: { userId }
})

///////////// 
// sagas ////
/////////////
export const signUpSaga = function * () {
  const auth = yield firebase.auth()
  while(true) {
    const action = yield take(SIGN_UP_REQUEST)
    const { email, password } = action.payload
    try {
      yield call([auth, auth.createUserWithEmailAndPassword], email, password) 
      yield firebase.auth().currentUser.sendEmailVerification()
    
    } catch(error) {
      yield put({
        type: SIGN_UP_ERROR,
        payload: { error }
      })
    }
  }
} 

export const signInSaga = function * () {
  const auth = yield firebase.auth()
  while(true) {
    const action = yield take(SIGN_IN_REQUEST)
    const { email, password } = action.payload
    try {
      yield call([ auth, auth.signInWithEmailAndPassword], email, password)
      // yield put(push('/all-movies'))
      
    } catch(error) {
      yield put({
        type: SIGN_IN_ERROR,
        payload: { error }
      })
    }
  }
}


const createAuthChannel = () => eventChannel(emit => firebase.auth().onAuthStateChanged(user => emit({ user })))

export const watchForStatus = function * () {
  const channel = yield call(createAuthChannel)
  while(true) {
    const { user } = yield take(channel)
    if (user) {
      yield put({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })

       
      yield put(push('/all-movies'))
    } else {
      yield put({
        type: SIGN_OUT_SUCCESS,
        payload: { user }
      })
    }
  }
}
 
//
export const signOutSaga = function * () {
  const auth = firebase.auth()
  try {
    yield call([auth, auth.signOut])
    yield put({
      type: SIGN_OUT_SUCCESS
    })
  } catch(error) {

  }
}

export const signInWithGoogleSaga = function * () {
  while(true) {
    yield take(SIGN_IN_WITH_GOOGLE)
    const auth = firebase.auth()
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    yield auth.signInWithPopup(googleProvider)
  }
}

export const createProfileSaga = function * () {
  while(true) {
    const action = yield take(CREATE_PROFILE_REQUEST)
    const { name, ava, email, userId } = action.payload

    yield firebase.database().ref('users').child(userId).remove()
  
    yield firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : ava,
      uid: userId
    })

    yield put({
      type: CREATE_PROFILE_SUCCESS
    })
  }
}


export const getProfileSaga = function * () {
  while(true) {
 
    try {
      const action = yield take(GET_PROFILE_REQUEST)
      const { userId } = action.payload
     
      const userRef = yield firebase.database().ref('users').orderByKey().equalTo(userId)
      const user = yield call([userRef, userRef.once], 'value')
      const user_val = _.toArray(user.val())
 
      yield put({
        type: GET_PROFILE_SUCCESS,
        payload: user_val[0]
      })
    } catch(error) {}
  }
}


export const saga = function * () {
  yield all([
    signUpSaga(),
    signInSaga(),
    watchForStatus(),
    createProfileSaga(),
    signInWithGoogleSaga(),
    getProfileSaga(),
    takeEvery(SIGN_OUT_REQUEST, signOutSaga)
  ])
}






//   firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then(user => dispatch({
//       type: SIGN_UP_SUCCESS,
//       payload: user
//     }))
//     .catch(error => dispatch({
//       type: SIGN_UP_ERROR,
//       payload: error
//     }))
// }
