import React from 'react'
import LoginForm from '../../components/LoginForm'

const Login = () => {

    return (
        <div className="bg-indigo-800">
            <div className="min-h-screen py-5 flex flex-col justify-center items-center h-full">
                <div className="w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
                    <LoginForm/>
                </div>
            </div>
        </div>
    );
}

export default Login;