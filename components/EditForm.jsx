import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Error from './Error'
import { editProduct } from '../redux/actions/productsActions'

const EditForm = ({product}) => {

    const {id, name, price, code, description} = product

    const dispatch = useDispatch()

    //State values
    const error = useSelector(state => state.products.error)


    const form = useFormik({
        initialValues: {
            name: name,
            price: price,
            code: code,
            description: description,
            id: id
        },
        validationSchema: yup.object({
            name: yup.string().required("Add a name"),
            price: yup.string().required("Add a price"),
            code: yup.string().required("Add a code"),
            description: yup.string().required("Add a description")
        }),
        onSubmit: (values) => {
            dispatch( editProduct(values) )
        }
    });

    return ( 
        <form onSubmit={form.handleSubmit} className="flex flex-col my-5 shadow-lg rounded border border-gray-500 p-5">
            <h2 className="text-center text-2xl">Edit Product</h2>
            {error ? <Error msg="An error has occurred. Please try again."/> : null}
            <div className="my-5">
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.values.name}
                        onChange={form.handleChange}
                    />
                    {form.errors.name && form.touched.name ? <Error msg={form.errors.name}/> : null}
                </div>

                <div className="field">
                    <label htmlFor="prince">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={form.values.price}
                        onChange={form.handleChange}
                    />
                    {form.errors.price && form.touched.price ? <Error msg={form.errors.price}/> : null}
                </div>

                <div className="field">
                    <label htmlFor="code">Code</label>
                    <input
                        type="text"
                        name="code"
                        value={form.values.code}
                        onChange={form.handleChange}
                    />
                    {form.errors.code && form.touched.code ? <Error msg={form.errors.code}/> : null}
                </div>

                <div className="field">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="border border-gray-500 focus:outline-none rounded p-3"
                        name="description"
                        id=""
                        cols="30"
                        rows="10"
                        value={form.values.description}
                        onChange={form.handleChange}
                    ></textarea>
                    {form.errors.description && form.touched.description ? <Error msg={form.errors.description}/> : null}
                </div>
            </div>

            <button type="submit" className='btn w-10/12 m-auto'>Save <i className='fas fa-save'></i></button>

        </form>
     )
}
 
export default EditForm;
