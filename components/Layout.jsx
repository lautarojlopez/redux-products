import React, {Fragment} from 'react'
import Script from 'next/script';
//Components
import Header from './Header';

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