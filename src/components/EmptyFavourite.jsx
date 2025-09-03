import React from 'react'
import { FcDislike } from "react-icons/fc";

export const EmptyFavourite = () => {
  return (
   <>
     <div className='min-h-screen bg-gradient-to-br  from-yellow-100 via-pink-100 to-purple-200'>
    <h1 className="text-2xl font-bold mb-4 text-center bg-linear-65 from-orange-300 via-yellow-100 to-red-300 py-3 bg-blue-500  sticky top-0  drop-shadow-2xs pb-4  border-amber-100 z-50">📚 Book Finder</h1>
    <div className='p-35'>
    <div className=' items-center flex-col flex justify-center pt-[50
    %] text-9xl max-sm:5xl animate-pulse text-center'>
      <div className='text-5xl animate-pulse'><FcDislike /></div>
      <h1 className='text-2xl font-extrabold text-red-400 animate-pulse text-center'>NO FAVOURITE BOOK FOUND..</h1>
    </div>
    </div>
    </div>
   </>
  )
}
