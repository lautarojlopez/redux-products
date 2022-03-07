import types from "../types"
import { db } from '../../config/firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { updateProfile, signInWithEmailAndPassword } from "firebase/auth"
import Swal from "sweetalert2"
import router from 'next/router'

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
                                router.push('/')
                            }
                        })
                    })
                    .catch((error) => {
                        console.log(error.message)
                        if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                            dispatch({
                                type: types.REGISTER_USER_ERROR,
                                payload: 'Password should be at least 6 characters'
                            })
                        } else if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
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
            await signInWithEmailAndPassword(auth, data.email, data.password)
                .then(() => {
                    router.push('/')
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (error) {

        }
    }
}