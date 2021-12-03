import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { authReducer } from '../reducers/authReducer'

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;


export const store = createStore(
  authReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);