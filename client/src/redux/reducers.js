import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer, { module_name as auth_module } from './ducks/auth'
import peopleReducer, { module_name as people_module } from './ducks/people'
import moviesReducer, { module_name as movies_module } from './ducks/movies'
import commentsReducer, { module_name as comments_module } from './ducks/comments'

const rootReducer = combineReducers({
  form,
  [auth_module] : authReducer,
  [people_module]: peopleReducer,
  [movies_module]: moviesReducer,
  [comments_module]: commentsReducer
})

export default rootReducer