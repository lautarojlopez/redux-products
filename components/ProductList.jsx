import React from 'react'
import Product from './Product'
import { Fragment } from 'react'
import { sortByName, sortByPrice, sortByCode } from '../redux/actions/productsActions'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'

const ProductList = ({ products }) => {

    const dispatch = useDispatch()

    //Get values from store
    const loading = useSelector(state => state.products.loading)

    const sortProductsByName = (products) => {
        dispatch( sortByName(products) )
    }
    const sortProductsByPrice = (products) => {
        dispatch( sortByPrice(products) )
    }
    const sortProductsByCode = (products) => {
        dispatch( sortByCode(products) )
    }

    return (
        <Fragment>
            <h2 className='text-4xl text-center my-5 text-orange-500 font-bold'>Products</h2>

            <div className='flex m-auto justify-center items-center'>
                <button onClick={() => sortProductsByName(products)} className='btn mr-3'>Name <i className="fas fa-arrow-down text-lg"></i></button>
                <button onClick={() => sortProductsByPrice(products)} className='btn mr-3'>Price <i className="fas fa-arrow-down text-lg"></i></button>
                <button onClick={() => sortProductsByCode(products)} className='btn'>Code <i className="fas fa-arrow-down text-lg"></i></button>
            </div>

            <div className='m-auto w-11/12'>
                {
                    loading ? <div className='my-10'><Spinner/></div> : (
                        products.length > 0 ? products.map((product) => (
                            <Product
                                key={product.id}
                                product={product}
                            />
                        )) : <p className='text-xl my-3 text-center'>There are no products yet.</p>
                    )
                }
            </div>
        </Fragment>
    )
}

export default ProductList