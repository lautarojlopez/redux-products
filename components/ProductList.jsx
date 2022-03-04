import React from 'react'
import Product from './Product';

const ProductList = ({products}) => {

    return ( 
        <div className='p-5 m-auto w-11/12 rounded shadow-xl border border-gray-400'>
            <h2 className='text-2xl text-center'>Products</h2>
            {
                products.length > 0 ? products.map((product) => (
                    <Product product={product}/>
                )) : <p className=' my-3 text-center'>There are no products yet.</p>
            }
        </div>
     );
}
 
export default ProductList;