import React from 'react'

const Product = ({product}) => {

    const {name, price, code, description} = product

    return ( 
        <div className='my-5 shadow rounded border border-gray-500 p-3'>
            <p><span className='font-bold'>Name:</span> {name}</p>
            <p><span className='font-bold'>Price:</span> {price}</p>
            <p><span className='font-bold'>Code:</span> {code}</p>
            <p><span className='font-bold'>Description:</span> {description}</p>
        </div>
     );
}
 
export default Product;