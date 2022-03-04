import React from 'react'

const Error = ({msg}) => {
    return ( 
        <p className='p-3 bg-red-200 text-red-500 font-bold text-center'>
            {msg}
        </p>
     );
}
 
export default Error