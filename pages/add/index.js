import React from 'react';
import Layout from '../../components/Layout'
import AddForm from '../../components/AddForm';

const Add = () => {
    return ( 
        <Layout>
            <div className='m-auto w-11/12 lg:w-6/12 xl:w-5/12'>
                <AddForm/>
            </div>
        </Layout>
     );
}
 
export default Add;