import types from '../types'
import axiosClient from '../../config/axios'

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
        } catch (error) {
            console.log(error)
            dispatch({
                type: types.ADD_PRODUCT_ERROR
            })
        }
    }
}