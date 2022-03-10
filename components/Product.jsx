import React from 'react'
import Link from 'next/link'
//Redux
import { useDispatch } from 'react-redux'
//Actions
import { deleteProduct } from '../redux/slices/productSlice'


const Product = ({product}) => {

    const {id, name, price, code, description} = product

    const dispatch = useDispatch()

    return ( 
        <div className='my-5 shadow rounded border border-gray-200 p-5'>
            <p><span className='font-bold text-indigo-700'>Name:</span> {name}</p>
            <p><span className='font-bold text-indigo-700'>Price:</span> ${price}</p>
            <p><span className='font-bold text-indigo-700'>Code:</span> {code}</p>
            <p><span className='font-bold text-indigo-700'>Description:</span> {description}</p>

            <div className='mt-3'>
                <Link href={`/edit/${id}`}><a className='btn-edit mr-3'><i className="fas fa-edit"></i> Edit</a></Link>
                <button onClick={() => dispatch(deleteProduct(id))} className='btn-delete'><i className="fas fa-trash"></i> Delete</button>
            </div>
        </div>
     );
}
 
export default Product;