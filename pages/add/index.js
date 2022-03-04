import React from 'react';
import Layout from '../../components/Layout'
import AddForm from '../../components/AddForm';

const Add = () => {
    return ( 
        <Layout>
            <div className='m-auto w-6/12'>
                <AddForm/>
            </div>
        </Layout>
     );
}
 
export default Add;