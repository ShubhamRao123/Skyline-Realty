import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className='p-4 max-w-lg mx-auto '>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col'>
        <img src={currentUser.avatar} alt="profile"  className='rounded-full h-24 w-24 object-cover self-center mt-3 cursor-pointer'/>
        <input type="text" placeholder='username' id='username' 
        className='border p-3 rounded-lg mt-6'/>
        <input type="email" placeholder='email' id="email" className='border rounded-lg p-3 mt-6'/>
        <input type="password" id='password' placeholder='password' className='border rounded-lg mt-6 p-3'/>
        <button className='bg-slate-800 text-white rounded-lg p-3 uppercase mt-6 hover:opacity-90 disabled:opacity-75'>update</button>
        <button className='bg-green-900 rounded-lg uppercase p-3 mt-6 hover:opacity-90 disabled:opacity-75 text-white'>create listing</button>
      </form>
      <div className=' flex mt-5 justify-between'>
        <span className='uppercase text-rose-900  cursor-pointer '>delete account</span>
        <span className='uppercase text-rose-900 cursor-pointer'>sign out</span>
      </div>
    </div>
  )
}
