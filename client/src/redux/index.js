import { createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducers'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import history from '../history'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

// const DEVTOOLS = window.__REDUX_DEVTOOLS_EXTENSION__()
const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history))
const store = createStore(connectRouter(history)(rootReducer), compose(enhancer))

sagaMiddleware.run(rootSaga)

export default store