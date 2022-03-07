import React, { useEffect } from 'react';
import Link from 'next/link';
import { app } from '../config/firebase'
import { getAuth } from 'firebase/auth'
import { logOutAction } from '../redux/actions/authActions'
import { useDispatch } from 'react-redux'

const Header = () => {

    const auth = getAuth()
    const dispatch = useDispatch()
    const currentUser = auth.currentUser

    const logOut = (auth) => {
        dispatch( logOutAction(auth) )
    }

    return (
        <nav className='p-5 bg-indigo-800 text-white flex justify-between items-center'>
            <Link href="/"><h1 className='cursor-pointer text-3xl font-bold'>Redux</h1></Link>
            <div className='flex justify-between items-center'>
                {
                    currentUser ? <p className='font-bold text-xl mr-5'>Welcome, {currentUser.displayName}</p> : null
                }
                <Link href="/add"><a className='btn'>Add Product <i className="fas fa-plus-circle"></i></a></Link>
                <button onClick={() => logOut(auth)} className='btn-delete ml-5'>Log Out <i className="fa fa-sign-out"></i></button>
            </div>
        </nav>
    );
}

export default Header;