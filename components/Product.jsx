import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteProductAction } from '../redux/actions/productsActions'
import Link from 'next/link'

const Product = ({product}) => {

    const {id, name, price, code, description} = product

    const dispatch = useDispatch()

    const deleteProduct = (id) => { 
        dispatch(deleteProductAction(id))
    }

    return ( 
        <div className='my-5 shadow rounded border border-gray-200 p-3'>
            <p><span className='font-bold'>Name:</span> {name}</p>
            <p><span className='font-bold'>Price:</span> ${price}</p>
            <p><span className='font-bold'>Code:</span> {code}</p>
            <p><span className='font-bold'>Description:</span> {description}</p>

            <div className='my-3'>
                <Link href={`/edit/${id}`}><a className='btn-edit mr-3'><i className="fas fa-edit"></i> Edit</a></Link>
                <button onClick={() => deleteProduct(id)} className='btn-delete'><i className="fas fa-trash"></i> Delete</button>
            </div>
        </div>
     );
}
 
export default Product;