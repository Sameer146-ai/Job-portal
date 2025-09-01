import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { UserButton , useUser , useClerk } from '@clerk/clerk-react'
import { AppContext } from '../context/AppContext';
function Navbar() {
    
    const navigate = useNavigate()
    const {openSignIn} = useClerk();
    const {user} = useUser();
    const {setShowRecruiterLogin} = useContext(AppContext)

  return (
    <div className='shadow py-4'>
        <div className='container px-4 2xl:px-20 mx-auto flex justify-between'>
            <img onClick={()=>navigate('/')} src={assets.logo} alt="logo" className='cursor-pointer'/>
            {user ? <div className='flex items-center gap-4'>
                <Link to={'/applications'}>Applied Jobs</Link>
                <p>|</p>
                <p className='max-sm:hidden'>Hi, {user.firstName}</p>
              <UserButton/>
            </div> : 
             <div className='flex gap-4 max-sm:text-xs'>
                <button onClick={()=>setShowRecruiterLogin(true)} className='text-gray-600'>Recruiter Login</button>
                <button onClick={()=> openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'>Login</button>
             </div>
            }
            
        </div>
    </div>
  )
}

export default Navbar