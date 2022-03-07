import React, { useEffect } from 'react';
import Link from 'next/link';
import { app } from '../config/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const Header = () => {

    const auth = getAuth()
    const currentUser = auth.currentUser

    return (
        <nav className='p-5 bg-indigo-800 text-white flex justify-between items-center'>
            <Link href="/"><h1 className='cursor-pointer text-3xl font-bold'>Redux</h1></Link>
            <div className='flex justify-between items-center'>
                {
                    currentUser ? <p className='font-bold text-xl mr-5'>Welcome, {currentUser.displayName}</p> : null
                }
                <Link href="/add"><a className='btn'>Add Product <i className="fas fa-plus-circle"></i></a></Link>
            </div>
        </nav>
    );
}

export default Header;