import React from "react"
import { useFormik } from "formik"
import * as yup from 'yup'
import { useDispatch, useSelector } from "react-redux"
import Error from "./Error"
import { app } from "../config/firebase"
import { getAuth } from "firebase/auth"
import Spinner from "./Spinner"
import shortid from "shortid"

//Redux actions
import { addProductAction } from "../redux/actions/productsActions"

const AddForm = () => {


    const dispatch = useDispatch()

    //State values
    const error = useSelector(state => state.products.error)
    const loading = useSelector(state => state.products.loading)

    //Get current user
    const auth = getAuth()
    const currentUser = auth.currentUser


    const form = useFormik({
        initialValues: {
            name: "",
            price: "",
            code: "",
            description: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Add a name"),
            price: yup.string().required("Add a price"),
            code: yup.string().required("Add a code"),
            description: yup.string().required("Add a description")
        }),
        onSubmit: (product) => {
            product.user = currentUser.uid
            product.id = shortid.generate()
            dispatch(addProductAction(product))
        }
    })

    return (
        <form onSubmit={form.handleSubmit} className="flex flex-col my-5 shadow-lg rounded border border-gray-200 p-5">
            <h2 className="text-center text-2xl text-orange-500 font-bold">Add New Product</h2>
            {error ? <Error msg="An error has occurred. Please try again." /> : null}
            <div className="my-5">
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
                    <label htmlFor="prince">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={form.values.price}
                        onChange={form.handleChange}
                    />
                    {form.errors.price && form.touched.price ? <Error msg={form.errors.price} /> : null}
                </div>

                <div className="field">
                    <label htmlFor="code">Code</label>
                    <input
                        type="text"
                        name="code"
                        value={form.values.code}
                        onChange={form.handleChange}
                    />
                    {form.errors.code && form.touched.code ? <Error msg={form.errors.code} /> : null}
                </div>

                <div className="field">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id=""
                        cols="30"
                        rows="10"
                        value={form.values.description}
                        onChange={form.handleChange}
                    ></textarea>
                    {form.errors.description && form.touched.description ? <Error msg={form.errors.description} /> : null}
                </div>
            </div>

            {
                loading ? <Spinner /> : <button type="submit" className="btn w-10/12 m-auto">
                    Add <i className="fas fa-plus-circle"></i>
                </button>
            }

        </form>
    )
}

export default AddForm
