import { configureStore } from '@reduxjs/toolkit'
//Reducers
import productsReducer from './reducers/productsReducer'
import authReducer from './reducers/authReducer'

const store = configureStore({
    reducer:{
        products: productsReducer,
        auth: authReducer
    }
})

export default store