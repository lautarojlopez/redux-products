import types from '../types'
import axiosClient from '../../config/axios'
import router from 'next/router'
import Swal from 'sweetalert2'
import { app, db } from '../../config/firebase'
import { addDoc, collection, getDocs, query, where, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

//Add new product
export const addProductAction = (product) => {
    return async (dispatch) => {
        dispatch({ type: types.ADD_PRODUCT })
        try {
            //Post product
            const productsRef = collection(db, 'products')
            await addDoc(productsRef, product).then(() => {
                Swal.fire(
                    'Product added successfully',
                    '',
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        dispatch({
                            type: types.ADD_PRODUCT_SUCCESS,
                            payload: product
                        })
                        router.push('/')
                    }
                })
            })
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
            //Get products from Firestore
            const auth = getAuth()
            const currentUser = auth.currentUser
            const products = []
            const productsRef = collection(db, 'products')
            const productsQuery = query(productsRef, where('user', "==", currentUser.uid))
            await getDocs(productsQuery).then((snapshot) => {
                //Push every product doc into products array
                snapshot.docs.forEach(product => {
                    products.push(product.data())
                })
            })
            //Set products in state
            dispatch({
                type: types.GET_PRODUCTS_SUCCESS,
                payload: products
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: types.GET_PRODUCTS_ERROR
            })
        }
    }
}

//Clear state
export const clearState = () => {
    return dispatch => {
        dispatch({
            type: types.CLEAR_STATE
        })
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
                try {
                    //Get product from Firestore
                    const productsRef = collection(db, 'products')
                    const productsQuery = query(productsRef, where('id', '==', id))
                    await getDocs(productsQuery).then((snapshot) => {
                        //Push every product doc into products array
                        snapshot.docs.forEach(async product => {
                            await deleteDoc(doc(db, 'products', product.id))
                                .then(() => {
                                    dispatch({
                                        type: types.DELETE_PRODUCT,
                                        payload: id
                                    })
                                    Swal.fire(
                                        'Deleted!',
                                        'Your file has been deleted.',
                                        'success'
                                    )
                                })
                        })
                    })
                } catch (error) {
                    console.log(error)
                    Swal.fire(
                        'Ups...',
                        'Something went wront. Please try again.',
                        'error'
                    )
                }

            }
        })
    }
}

//Get product by ID
export const getProductById = (id) => {
    return async (dispatch) => {
        try {
            const productsRef = collection(db, 'products')
            const productQuery = query(productsRef, where('id', '==', id))
            const product = await getDocs(productQuery).then((snapshot) => {
                return snapshot.docs[0].data()
            })
            dispatch({
                type: types.GET_EDIT_PRODUCT,
                payload: product
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//Edit product
export const editProduct = (product) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: types.EDIT_PRODUCT
            })
            //Get product from Firestore
            const productsRef = collection(db, 'products')
            const productQuery = query(productsRef, where('id', '==', product.id))
            const productSnap = await getDocs(productQuery).then(snapshot => {
                return snapshot.docs[0]
            })
            //Save changes
            await updateDoc(doc(db, 'products', productSnap.id), product)
                .then(() => {
                    Swal.fire(
                        'Saved',
                        'Product edited successfully.',
                        'success'
                    ).then((result) => {
                        if (result.isConfirmed) {
                            dispatch({
                                type: types.EDIT_PRODUCT_SUCCESS
                            })
                            router.push('/')
                        }
                    })
                })
        } catch (error) {
            console.log(error)
            dispatch({
                type: types.EDIT_PRODUCT_ERROR
            })
            Swal.fire(
                'Ups...',
                'Something went wront. Please try again.',
                'error'
            )
        }
    }
}

//Sort products by name
export const sortByName = () => {
    return (dispatch) => {
        dispatch({
            type: types.SORT_BY_NAME
        })
    }
}