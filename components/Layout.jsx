import React, {Fragment} from 'react'
import Header from './Header';
import Head from 'next/head';

const Layout = ({children}) => {
    return ( 
        <Fragment>
            <Head>
			    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous"/>
            </Head>
            <Header/>
            {children}
        </Fragment>
     );
}
 
export default Layout;