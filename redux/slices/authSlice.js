import { createSlice } from "@reduxjs/toolkit"
import { app, db } from '../../config/firebase'
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, signOut } from 'firebase/auth'
import Swal from "sweetalert2"
import router from 'next/router'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        error: false,
        message: ''
    },
    reducer: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.loading = action.payload
        },
        setMessage: (state, action) => {
            state.message = action.payload
        }
    }
})

//Destructuring actions into a single object
export const { ...actions } = authSlice.actions

//FUNCTIONS
//Register user
export const registerUser = (user) => {
    return async (dispatch) => {
        try {
            //Verify if passwords match
            if (user.password === user.verifyPassword) {
                dispatch(actions.setLoading(true))
                const auth = getAuth()
                //Create user
                await createUserWithEmailAndPassword(auth, user.email, user.password)
                    .then(async (credentials) => {
                        //Set user displayName
                        await updateProfile(auth.currentUser, { displayName: user.name })
                        dispatch(actions.setError(false))
                        dispatch(actions.setLoading(false))
                        dispatch(actions.setMessage(''))
                        //Show modal with success message
                        Swal.fire(
                            'Your account has been created!',
                            '',
                            'success'
                        ).then((result) => {
                            if (result.isConfirmed) {
                                //Redirect to home
                                router.push('/')
                            }
                        })
                    })
                    .catch((error) => {
                        if (error.code === 'auth/weak-password') { //If password is weak
                            dispatch(actions.setLoading(false))
                            dispatch(actions.setError(true))
                            dispatch(actions.setMessage('Password should be at least 6 characters'))
                        } else if (error.code === 'auth/email-already-in-use') { //If e-mail already in use
                            dispatch(actions.setLoading(false))
                            dispatch(actions.setError(true))
                            dispatch(actions.setMessage('E-mail already in use'))
                        }
                    })
            } else {
                //If passwords don't match
                dispatch(actions.setLoading(false))
                dispatch(actions.setError(true))
                dispatch(actions.setMessage('Passwords don\'t match'))
            }
        } catch (error) {
            dispatch(actions.setLoading(false))
            dispatch(actions.setError(true))
            dispatch(actions.setMessage('Something went wrong. Please try again.'))
        }
    }
}

//Login user
export const logIn = (user) => {
    return async (dispatch) => {
        try {
            const auth = getAuth()
            await setPersistence(auth, browserLocalPersistence)
                .then(async () => {
                    dispatch(actions.setLoading(true))
                    await signInWithEmailAndPassword(auth, user.email, user.password)
                        .then(() => {
                            dispatch(actions.setLoading(false))
                            dispatch(actions.setError(false))
                            dispatch(actions.setMessage(''))
                            //Redirect to home
                            router.push('/')
                        })
                        .catch((error) => {
                            if (error.code === 'auth/wrong-password') { //If password is wrong
                                dispatch(actions.setLoading(false))
                                dispatch(actions.setError(true))
                                dispatch(actions.setMessage("Wrong Password"))
                            } else if (error.code === 'auth/user-not-found') {
                                dispatch(actions.setLoading(false))
                                dispatch(actions.setError(true))
                                dispatch(actions.setMessage("Invalid User"))
                            }
                        })
                })
        } catch (error) {
            dispatch(actions.setLoading(false))
            dispatch(actions.setError(true))
            dispatch(actions.setMessage('Something went wrong. Please try again.'))
        }
    }
}

//Logout user
export const logOut = (auth) => {
    return async (dispatch) => {
        await signOut(auth).then(() => {
            //Redirect to login page
            router.push('/login')
        })
    }
}

export default authSlice.reducer