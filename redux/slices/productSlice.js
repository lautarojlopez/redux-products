import { createSlice } from "@reduxjs/toolkit"
import router from 'next/router'
import Swal from 'sweetalert2'
import { app, db } from '../../config/firebase'
import { addDoc, collection, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        error: false,
        loading: false,
        toEditProduct: null,
    },
    reducer: {
        startLoading: (state) => {
            state.loading = true
        },
        stopLoading: (state) => {
            state.loading = false
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        addProductSuccess: (state, action) => {
            state.products = [...state.products, action.payload]
        },
        getProductsSuccess: (state, action) => {
            state.products = action.payload
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload)
        },
        getEditProduct: (state, action) => {
            state.toEditProduct = action.payload
        },
        editProductSuccess: (state) => {
            state.toEditProduct = null
        },
        clearState: (state) => {
            state.loading = false
            state.error = false
            state.toEditProduct = null
        },
        sortProducts: (state, action) => {
            state.products = action.payload
        }
    }
})

//Destructuring every action into a single object
export const { ...actions } = productsSlice.actions

//FUNCTIONS
//Get user's products
export const getUserProducts = () => {
    return async (dispatch) => {
        dispatch(actions.startLoading())
        try {
            //Get current user ID
            const auth = getAuth()
            const userID = auth.currentUser.uid
            //Empty array to store every user's product
            const products = []
            //Get products from Firestore database
            const productsRef = collection(db, 'products')
            const productsQuery = query(productsRef, where('user', "==", userID))
            await getDocs(productsQuery).then((snapshot) => {
                //Push every product doc data into products array
                snapshot.docs.forEach(product => {
                    products.push(product.data())
                })
            })
            //Set products in state
            dispatch(actions.getProductsSuccess(products))
            dispatch(actions.stopLoading())
            dispatch(actions.setError(false))
        } catch (error) {
            //Display error in console
            console.log(error)
            dispatch(actions.stopLoading())
            dispatch(actions.setError(true))
        }
    }
}

//Add product
export const addProduct = (product) => {
    return async (dispatch) => {
        dispatch(actions.startLoading())
        try {
            //Parse price from string to nomber
            product.price = Number(product.price)
            //Add product to Firestore database
            const productsRef = collection(db, 'products')
            await addDoc(productsRef, product).then(() => {
                //Show modal with success message
                Swal.fire(
                    'Product added successfully',
                    '',
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(actions.stopLoading())
                        dispatch(actions.setError(false))
                        //Add product to store
                        dispatch(actions.addProductSuccess(product))
                        //Redirect to home
                        router.push('/')
                    }
                })
            })
        } catch (error) {
            //Display error in console
            console.log(error)
            dispatch(actions.stopLoading())
            dispatch(actions.setError(true))
            //Show modal with error message
            Swal.fire(
                'Ups...',
                'Something went wrong. Please try again.',
                'error'
            )
        }
    }
}

//Delete product by ID
export const deleteProduct = (id) => {
    return async (dispatch) => {
        //Show confirm modal
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
                        //Delete product from Firestore
                        snapshot.docs.forEach(async product => {
                            await deleteDoc(doc(db, 'products', product.id))
                                .then(() => {
                                    //Delete product from store
                                    dispatch(actions.deleteProduct(id))
                                    //Show modal with success message
                                    Swal.fire(
                                        'Deleted!',
                                        'Your product has been deleted.',
                                        'success'
                                    )
                                })
                        })
                    })
                } catch (error) {
                    //Display error in console
                    console.log(error)
                    //Show modal with error message
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
            //Get product from Firestore database
            const productsRef = collection(db, 'products')
            const productQuery = query(productsRef, where('id', '==', id))
            const product = await getDocs(productQuery).then((snapshot) => {
                return snapshot.docs[0].data()
            })
            //Set product in store
            dispatch(actions.getEditProduct(product))
        } catch (error) {
            //Display error in console
            console.log(error)
        }
    }
}

//Edit product
export const editProduct = (product) => {
    return async (dispatch) => {
        dispatch(actions.startLoading())
        try {
            //Get product from Firestore
            const productsRef = collection(db, 'products')
            const productQuery = query(productsRef, where('id', '==', product.id))
            const productSnap = await getDocs(productQuery).then(snapshot => {
                return snapshot.docs[0]
            })
            //Save changes
            await updateDoc(doc(db, 'products', productSnap.id), product)
                .then(() => {
                    //Show modal with success message
                    Swal.fire(
                        'Saved',
                        'Product edited successfully.',
                        'success'
                    ).then((result) => {
                        if (result.isConfirmed) {
                            dispatch(actions.stopLoading())
                            dispatch(actions.setError(false))
                            dispatch(actions.editProductSuccess())
                            //Redirect to home
                            router.push('/')
                        }
                    })
                })
        } catch (error) {
            //Display error in console
            console.log(error)
            dispatch(actions.stopLoading())
            dispatch(actions.setError(true))
            //Show modal with error message
            Swal.fire(
                'Ups...',
                'Something went wront. Please try again.',
                'error'
            )
        }
    }
}

//Sort products by name
export const sortProductsByName = (products) => {
    return async (dispatch) => {
        products = [...products].sort((a, b) => {
            let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase()

            if (fa < fb) {
                return -1
            }
            if (fa > fb) {
                return 1
            }
            return 0
        })
        dispatch(actions.sortProducts(products))
    }
}

//Sort products by price
export const sortProductsByPrice = (products) => {
    return async (dispatch) => {
        products = [...products].sort((a, b) => {
            return a.price - b.price
        })
        dispatch(actions.sortProducts(products))
    }
}

//Sort products by code
export const sortProductsByCode = (products) => {
    return async (dispatch) => {
        products = [...products].sort((a, b) => {
            let fa = a.code.toLowerCase(),
                fb = b.code.toLowerCase()
        
            if (fa < fb) {
                return -1
            }
            if (fa > fb) {
                return 1
            }
            return 0
        })
        dispatch(actions.sortProducts(products))
    }
}

export default createSlice.reducer