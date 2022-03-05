import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import EditForm from '../../components/EditForm'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/dist/client/router'
import { getProductById } from '../../redux/actions/productsActions'

const Edit = () => {

    const dispatch = useDispatch()

    //Router object to get url query
    const router = useRouter()

    useEffect(() => {

        //When router is ready, get product ID from query and call dispatch
        if(router.isReady){
            dispatch(getProductById(router.query.id))
        }

    }, [router.isReady])

    return (
        <Layout>
            <div className='m-auto w-11/12 lg:w-6/12 xl:w-5/12'>
                <EditForm />
            </div>
        </Layout>
    );
}

export default Edit;