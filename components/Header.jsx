import React from 'react';
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
        <nav className='p-5 bg-indigo-800 text-white flex flex-col md:flex-row justify-between items-center'>
            <Link href="/"><h1 className='cursor-pointer text-3xl font-bold'>Redux</h1></Link>
            <div className='flex flex-col md:flex-row justify-between items-center'>
                {
                    currentUser ? <p className='font-bold text-xl mt-3 md:mr-5'>Welcome, {currentUser.displayName}</p> : null
                }
                <Link href="/add"><a className='btn mt-3'>Add Product <i className="fas fa-plus-circle"></i></a></Link>
                <button onClick={() => logOut(auth)} className='btn-delete mt-3 md:ml-5'>Log Out <i className="fa fa-sign-out"></i></button>
            </div>
        </nav>
    );
}

export default Header;