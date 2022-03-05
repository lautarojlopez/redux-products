import types from '../types'
import axiosClient from '../../config/axios'
import router from 'next/router'
import Swal from 'sweetalert2'

//Add new product
export const addProductAction = (product) => {
    return async (dispatch) => {
        dispatch({ type: types.ADD_PRODUCT })
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

//Get products
export const getProducts = () => {
    return async (dispatch) => {
        try {
            //Start loading
            dispatch({
                type: types.GET_PRODUCTS
            })
            //Get products from API
            const products = await axiosClient.get("/products")

            //Set products in state
            dispatch({
                type: types.GET_PRODUCTS_SUCCESS,
                payload: products.data
            })

        } catch (error) {
            console.log(error);
            dispatch({
                type: types.GET_PRODUCTS_ERROR
            })
        }
    }
}

//Delete product by ID
export const deleteProductAction = (id) => {
    return (dispatch) => {
        //Sweet Alert modal
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                //Delete product
                await axiosClient.delete(`/products/${id}`)
                dispatch({
                    type: types.DELETE_PRODUCT,
                    payload: id
                })
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }
}