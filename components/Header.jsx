import React from 'react';
import Link from 'next/link';

const Header = () => {
    return ( 
        <nav className='p-5 bg-indigo-800 text-white flex justify-between items-center'>
            <Link href="/"><h1 className='cursor-pointer text-3xl font-bold'>Redux</h1></Link>
            <Link href="/add"><a className='btn'>Add Product <i className="fas fa-plus-circle"></i></a></Link>
        </nav>
     );
}
 
export default Header;