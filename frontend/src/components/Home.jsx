import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className='w-full h-[calc(100vh-70px)] flex flex-col justify-center items-center gap-7 text-center px-4 overflow-hidden text-xl text-shadow-2xl'>
      <h1 className='text-5xl font-pacifico'>Welcome!</h1>
      <p className='first-letter:text-2xl'>This is a simple note-taking application where you can <span className='text-blue-500'>create</span>, <span className='text-blue-500'>edit</span>, and <span className='text-blue-500'>delete</span> your notes easily.</p>
      <p>Get started by creating a new note and enjoy organizing your thoughts!</p>
      <div className="flex flex-col gap-4 justify-center items-center">
        <Link to="/newaccount" className='bg-blue-500 px-6 py-2 rounded-md text-white font-semibold hover:bg-blue-600 shadow-lg transition-all duration-200'>Create Account</Link>
        <p className='text-sm'>already have an account? <a href="/login" className='text-blue-500 underline-effect'>login</a></p>
      </div>
    </div>


  )
}
