import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

//Redux actions
import { addProductAction } from "../redux/actions/productsActions";

const AddForm = () => {


    const dispatch = useDispatch()

    const form = useFormik({
        initialValues: {
            name: "",
            price: "",
            code: "",
            description: "",
        },
        onSubmit: (values) => {
            dispatch( addProductAction(values) )
        }
    });

    return (
        <form onSubmit={form.handleSubmit} className="flex flex-col my-5 shadow-lg rounded border border-gray-500 p-5">
            <h2 className="text-center text-2xl">Add New Product</h2>

            <div className="my-5">
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.values.name}
                        onChange={form.handleChange}
                    />
                </div>

                <div className="field">
                    <label htmlFor="prince">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={form.values.price}
                        onChange={form.handleChange}
                    />
                </div>

                <div className="field">
                    <label htmlFor="code">Code</label>
                    <input
                        type="text"
                        name="code"
                        value={form.values.code}
                        onChange={form.handleChange}
                    />
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
                </div>
            </div>

            <button type="submit" className="btn w-10/12 m-auto">
                Create
            </button>
        </form>
    );
};

export default AddForm;
