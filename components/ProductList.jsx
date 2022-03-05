import React from 'react'
import Product from './Product';
import { Fragment } from 'react';

const ProductList = ({ products }) => {

    return (
        <Fragment>
            <h2 className='text-4xl text-center my-5'>Products</h2>
            <div className='m-auto w-11/12'>
                {
                    products.length > 0 ? products.map((product) => (
                        <Product
                            key={product.code}
                            product={product}
                        />
                    )) : <p className='text-xl my-3 text-center'>There are no products yet.</p>
                }
            </div>
        </Fragment>
    );
}

export default ProductList;