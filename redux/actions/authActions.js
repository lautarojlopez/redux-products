import types from "../types"
import { db } from '../../config/firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { updateProfile, signInWithEmailAndPassword } from "firebase/auth"
import Swal from "sweetalert2"
import router from 'next/router'

//Clear any possible error message
export const clearError = () => {
    return (dispatch) => {
        dispatch({
            type: types.CLEAR_ERROR
        })
    }
}

//Register new user
export const registerUser = (user) => {
    return async (dispatch) => {
        try {

            //Verify if passwords match
            if (user.password === user.verifyPassword) {
                dispatch({
                    type: types.REGISTER_USER
                })
                const auth = getAuth()
                await createUserWithEmailAndPassword(auth, user.email, user.password)
                    .then(async (credentials) => {
                        //Set user displayName
                        credentials.user.displayName = user.name
                        await updateProfile(auth, credentials)
                        dispatch({
                            type: types.REGISTER_USER_SUCCESS
                        })
                        Swal.fire(
                            'Your account has been created!',
                            '',
                            'success'
                        ).then((result) => {
                            if (result.isConfirmed) {
                                logIn(user)
                                router.push('/')
                            }
                        })
                    })
                    .catch((error) => {
                        if (error.code === 'auth/weak-password') {
                            dispatch({
                                type: types.REGISTER_USER_ERROR,
                                payload: 'Password should be at least 6 characters'
                            })
                        } else if (error.code === 'auth/email-already-in-use') {
                            dispatch({
                                type: types.REGISTER_USER_ERROR,
                                payload: 'E-mail already in use'
                            })
                        }
                    })
            } else {
                dispatch({
                    type: types.REGISTER_USER_ERROR,
                    payload: 'Passwords don\'t match'
                })
            }

        } catch (error) {

        }
    }
}

//Log in user
export const logIn = (data) => {
    return async (dispatch) => {
        const auth = getAuth()
        try {
            dispatch({
                type: types.LOGIN_USER
            })
            await signInWithEmailAndPassword(auth, data.email, data.password)
                .then(() => {
                    dispatch({
                        type: types.LOGIN_USER_SUCCESS
                    })
                    router.push('/')
                })
                .catch((error) => {
                    if (error.code === 'auth/wrong-password') {
                        dispatch({
                            type: types.LOGIN_USER_ERROR,
                            payload: "Wrong Password"
                        })
                    } else if (error.code === 'auth/user-not-found') {
                        dispatch({
                            type: types.LOGIN_USER_ERROR,
                            payload: "Invalid User"
                        })
                    }

                })
        } catch (error) {

        }
    }
}