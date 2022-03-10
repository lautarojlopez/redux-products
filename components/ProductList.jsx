import React, { Fragment } from 'react'
//Components
import Product from './Product'
import Spinner from '../components/Spinner'
//Redux
import { useDispatch, useSelector } from 'react-redux'
//Actions
import { sortProductsByName, sortProductsByPrice, sortProductsByCode } from '../redux/slices/productSlice'
//Selectors
import { productsLoadingSelector } from '../redux/slices/productSlice'



const ProductList = ({ products }) => {

    const dispatch = useDispatch()

    //Get values from store
    const loading = useSelector(productsLoadingSelector)

    return (
        <Fragment>
            <h2 className='text-4xl text-center my-5 text-orange-500 font-bold'>Products</h2>

            <div className='flex m-auto justify-center items-center'>
                <button onClick={() => dispatch(sortProductsByName(products))} className='btn mr-3'>Name <i className="fas fa-arrow-down text-lg"></i></button>
                <button onClick={() => dispatch(sortProductsByPrice(products))} className='btn mr-3'>Price <i className="fas fa-arrow-down text-lg"></i></button>
                <button onClick={() => dispatch(sortProductsByCode(products))} className='btn'>Code <i className="fas fa-arrow-down text-lg"></i></button>
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