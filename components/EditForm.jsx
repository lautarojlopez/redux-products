import React from 'react';

const EditForm = () => {
    return ( 
        <form className='flex flex-col my-5 shadow-lg rounded border border-gray-500 p-5'>
            <h2 className='text-center text-2xl'>Edit Product</h2>

            <div className='my-5'>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name"/>
                </div>

                <div className="field">
                    <label htmlFor="prince">Price</label>
                    <input type="number" name="price"/>
                </div>

                <div className="field">
                    <label htmlFor="code">Code</label>
                    <input type="text" name="code"/>
                </div>

                <div className="field">
                    <label htmlFor="description">Description</label>
                    <textarea className='border border-gray-500 focus:outline-none rounded p-3' name="description" id="" cols="30" rows="10"></textarea>
                </div>
            </div>

            <button type="submit" className='btn w-10/12 m-auto'>Save</button>

        </form>
     )
}
 
export default EditForm;
