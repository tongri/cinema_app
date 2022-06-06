import {applyMiddleware, createStore} from '@reduxjs/toolkit'
import Reducer from './reducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'


const middleware = [thunk]

const composeEnhancer = composeWithDevTools(applyMiddleware(...middleware))

const store = createStore(Reducer, composeEnhancer)

export default store