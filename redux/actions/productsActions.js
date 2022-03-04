import types from '../types'
import axiosClient from '../../config/axios'
import router from 'next/router'

//Add new product
export const addProductAction = (product) => { 
    return async (dispatch) => {
        dispatch({type: types.ADD_PRODUCT})
        try {
            //Post product
            await axiosClient.post('/products', product)
            dispatch({
                type: types.ADD_PRODUCT_SUCCESS,
                payload: product
            })
            //Redirect to home
            router.push('/')
        } catch (error) {
            console.log(error)
            dispatch({
                type: types.ADD_PRODUCT_ERROR
            })
        }
    }
}