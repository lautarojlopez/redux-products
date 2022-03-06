import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Error from '../components/Error'
import Link from 'next/link'

const LoginForm = () => {

    const form = useFormik({

        initialValues: {
            email: '',
            password: ''
        },

        validationSchema: yup.object({
			email: yup.string().email('Invalid E-mail').required('Enter your e-mail'),
			password: yup.string().required('Enter your password')
		}),

        onSubmit: (values) => {
            console.log(values)
        }
    })

    return (
        <form onSubmit={form.handleSubmit} className="flex flex-col my-5 shadow-lg rounded border border-gray-500 p-5 bg-white">
            <h2 className="text-center text-2xl text-orange-500 font-bold">Log In</h2>

            <div className="my-5">

                <div className="field">
                    <label htmlFor="name">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.values.email}
                        onChange={form.handleChange}
                    />
                    {form.errors.email && form.touched.email ? <Error msg={form.errors.email}/> : null}
                </div>

                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.values.password}
                        onChange={form.handleChange}
                    />
                    {form.errors.password && form.touched.password ? <Error msg={form.errors.password}/> : null}
                </div>

            </div>

            <button type="submit" className="btn w-10/12 m-auto">
                Enter <i className="fa-solid fa-right-to-bracket"></i>
            </button>

            <Link href="/register"><a className='font-bold text-orange-500 text-center text-lg my-5'>Don't have an account? Create one</a></Link>

        </form>
    );
}

export default LoginForm;