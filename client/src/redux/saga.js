import { saga as people_saga } from './ducks/people'
import { saga as auth_saga } from './ducks/auth'
import { saga as movies_saga } from './ducks/movies'
import { saga as commenrs_saga } from './ducks/comments'
import { all } from 'redux-saga/effects'

export default function * () {
  yield all([
    people_saga(),
    auth_saga(),
    movies_saga(),
    commenrs_saga(),
  ])
}