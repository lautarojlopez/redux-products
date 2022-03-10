import React, { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
//Components
import Layout from '../../components/Layout'
import EditForm from '../../components/EditForm'
//Redux
import { useDispatch, useSelector } from 'react-redux'
//Actions
import { getProductById } from '../../redux/slices/productSlice'
//Selectors
import { productToEditSelector } from '../../redux/slices/productSlice'

const Edit = () => {

    const dispatch = useDispatch()

    //Router object to get url query
    const router = useRouter()

    //Get values from state
    const product = useSelector(productToEditSelector)

    useEffect(() => {

        //When router is ready, get product ID from query and call dispatch
        if(router.isReady){
            dispatch(getProductById(router.query.id))
        }

    }, [router.isReady])

    return (
        <Layout>
            <div className='m-auto w-11/12 lg:w-6/12 xl:w-5/12'>
                {
                    product ? <EditForm product={product} /> : <p className='text-2xl text-center my-5'>Product not found.</p>
                }
            </div>
        </Layout>
    );
}

export default Edit;