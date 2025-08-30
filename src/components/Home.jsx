import React from 'react'
import { useNavigate } from 'react-router-dom';


export const Home = () => {
    const navigate = useNavigate();
    const handleBrowseClick = () => {
         console.log("Browse button clicked");
        navigate('/browse');
    }
  return (
    
     <>
       <>
   <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        
        <h1 className="text-5xl font-extrabold text-purple-700 mb-4 animate-pulse">
          📚 Browse Books
        </h1>

       
        <p className="text-lg text-gray-700 mb-6">
          Here you can find a variety of <span className="font-semibold text-purple-600">books</span> to explore based on your mood 🌈✨
        </p>

     
        <button
          onClick={handleBrowseClick}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95"
        >
          🚀 View All Books
        </button>
      </div>
    </div>


    
 
    
     </>
     </>
  )
}
