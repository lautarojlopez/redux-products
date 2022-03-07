import React, {useEffect} from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Error from '../components/Error'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/actions/authActions'
import Spinner from './Spinner'
import { clearError } from '../redux/actions/authActions'

const LoginForm = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch( clearError() )
    }, [])

    //Get values from store
    const loading = useSelector(state => state.auth.loading)
    const error = useSelector(state => state.auth.error)
    const message = useSelector(state => state.auth.message)

    const form = useFormik({

        initialValues: {
            name: '',
            email: '',
            password: '',
            verifyPassword: ''
        },

        validationSchema: yup.object({
            name: yup.string().required('Enter your name'),
            email: yup.string().email('Invalid E-mail').required('Enter your e-mail'),
            password: yup.string().required('Enter your password'),
            verifyPassword: yup.string().required('Verify your password')
        }),

        onSubmit: (values) => {
            dispatch(registerUser(values))
        }
    })

    return (
        <form onSubmit={form.handleSubmit} className="flex flex-col my-5 shadow-lg rounded border border-gray-500 p-5 bg-white">
            <h2 className="text-center text-2xl text-orange-500 font-bold">Create Account</h2>

            {
                error ? <Error msg={message}/> : null
            }

            <div className="">

                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.values.name}
                        onChange={form.handleChange}
                    />
                    {form.errors.name && form.touched.name ? <Error msg={form.errors.name} /> : null}
                </div>

                <div className="field">
                    <label htmlFor="name">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.values.email}
                        onChange={form.handleChange}
                    />
                    {form.errors.email && form.touched.email ? <Error msg={form.errors.email} /> : null}
                </div>

                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.values.password}
                        onChange={form.handleChange}
                    />
                    {form.errors.password && form.touched.password ? <Error msg={form.errors.password} /> : null}
                </div>

                <div className="field">
                    <label htmlFor="verify">Verify Password</label>
                    <input
                        type="password"
                        name="verifyPassword"
                        value={form.values.verifyPassword}
                        onChange={form.handleChange}
                    />
                    {form.errors.verifyPassword && form.touched.verifyPassword ? <Error msg={form.errors.verifyPassword} /> : null}
                </div>

            </div>

            {
                loading ? <Spinner /> : <button type="submit" className="btn w-10/12 m-auto">
                    Registrate <i className="fa-solid fa-right-to-bracket"></i>
                </button>
            }

            <Link href="/login"><a className='font-bold text-orange-500 text-center text-lg my-5'>Already registered? Log In</a></Link>

        </form>
    );
}

export default LoginForm;