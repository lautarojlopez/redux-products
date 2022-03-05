import React, {Fragment} from 'react'
import Header from './Header';
import Script from 'next/script';

const Layout = ({children}) => {
    return ( 
        <Fragment>
            <Header/>
            {children}
            <Script
				src="https://kit.fontawesome.com/e323a62359.js"
			/>
        </Fragment>
     );
}
 
export default Layout;