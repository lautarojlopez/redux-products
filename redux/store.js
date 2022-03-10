import { configureStore } from '@reduxjs/toolkit'
//Reducers
import productsReducer from '../redux/slices/productSlice'
import authReducer from '../redux/slices/authSlice'

const store = configureStore({
    reducer:{
        products: productsReducer,
        auth: authReducer
    }
})

export default store