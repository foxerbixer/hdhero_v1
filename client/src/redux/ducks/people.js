import { Record, OrderedMap } from 'immutable'
import { put, takeEvery, call, take } from 'redux-saga/effects'
import { app_name } from '../../firebase/config'
import { createSelector } from 'reselect'
import { reset } from 'redux-form'
import { transformFbPeople } from './helpers'
import firebase from 'firebase'

export const module_name = 'people'
export const ADD_PERSON_REQUEST = `${app_name}/${module_name}/ADD_PERSON_REQUEST`
export const ADD_PERSON_SUCCESS = `${app_name}/${module_name}/ADD_PERSON_SUCCESS`
export const GET_ALL_PEOPLE_REQUEST = `${app_name}/${module_name}/GET_ALL_PEOPLE_REQUEST`
export const GET_ALL_PEOPLE_SUCCESS = `${app_name}/${module_name}/GET_ALL_PEOPLE_SUCCESS`
export const GET_ALL_PEOPLE_ERROR = `${app_name}/${module_name}/GET_ALL_PEOPLE_ERROR`


const ReducerState = Record({
  entities: new OrderedMap({}),
  isLoading: false
})

const Person = Record({
  uid: null,
  firstname: null,
  lastname: null,
  email: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch(type) {
    case ADD_PERSON_REQUEST:
    case GET_ALL_PEOPLE_REQUEST:
      return state.set('isLoading', true)   
    case ADD_PERSON_SUCCESS:
      return state
        .set('isLoading', false)
        .setIn(['entities', payload.uid], new Person(payload) )
    case GET_ALL_PEOPLE_SUCCESS:
      return state
        .set('isLoading', false) 
        .set('entities', transformFbPeople(payload, Person))   
    default:
      return state
  }
}

//////////////
// reselect //
/////////////
const selectorState = state => state[module_name]
export const entitiesSelector = (createSelector(selectorState, state => state.entities))
export const peopleSelector = (createSelector(entitiesSelector, entities => (
  entities.valueSeq().toArray()
)))

/////////////
// actions //
/////////////
export const addPerson = person => ({
  type: ADD_PERSON_REQUEST,
  payload: person
})

export const getAllPeople = () =>({
  type: GET_ALL_PEOPLE_REQUEST
})

/////////////
// sagas ////
/////////////
export const addPersonSaga = function * (action) {
  const peopleRef = firebase.database().ref('/people')
  try {
    const ref = yield call([peopleRef, peopleRef.push], action.payload)
    yield put({
      type: ADD_PERSON_SUCCESS,
      payload: {...action.payload, uid: ref.key}
    })
    yield put(reset('person'))
  } catch(error) {
  }
}

export const getAllPeopleSaga = function * () {
  const peopleRef = firebase.database().ref('/people')
  try {
    const allPeople = yield call([peopleRef, peopleRef.once], 'value')
    yield put({
      type: GET_ALL_PEOPLE_SUCCESS,
      payload: allPeople.val()
    })
  }catch(error) {

  }
}

export const saga = function * () {
  yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
  yield takeEvery(GET_ALL_PEOPLE_REQUEST, getAllPeopleSaga)
}

