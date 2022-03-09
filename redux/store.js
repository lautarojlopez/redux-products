import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { configureStore } from '@reduxjs/toolkit'

//TODO: Import redux-toolkit and configure store

const store = createStore(
    reducer,
    composeWithDevTools( 
        applyMiddleware(thunk),
    )
)

export default store