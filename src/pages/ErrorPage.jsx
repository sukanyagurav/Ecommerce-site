import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
   <>
    <Header/>
    <main className='text-center mt-8'>
        <h2 className='text-3xl text-gray-600'>Sorry, we can't find the page you're looking for</h2>
        <p className='my-7 text-xl text-gray-500 '>let's get you back on track...</p>
        <Link to='/' className='border-b-2 text-gray-600 border-b-orange-400 pb-1 uppercase tracking-wide'>Go back Homepage</Link>
    </main>
   </>
  )
}

export default ErrorPage
