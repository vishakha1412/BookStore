import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { FaRegStar } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { disableInstantTransitions, motion } from 'framer-motion';
import {useDispatch,useSelector} from 'react-redux'
import { addFavourite,removeFavourite } from '../../features/Favourites';
 



export const Browse = () => {
  const dispatch = useDispatch();
 
  const navigate = useNavigate();
  const array=useSelector((state) => state.favourites.books);
    
 const bookid = array.filter(item => item !== "");
    const[books ,setBook] =useState('');
    const[added, setAdded] = useState(false);
     
    const [mood, setMood] = useState("happy");
    const [loading, setLoading] = useState(false);
   //const bookIdFound=bookid.indexOf(bookid.id)>=0;

 

     const [query, setQuery] = useState();
    const handleClick=(id) =>{
    
        console.log(`Book with ID ${id} added to favourites`);
        console.log(bookid.indexOf(id)>=0);
        dispatch(addFavourite(id));
       
        
        
    }
    const handleRemoveClick=(id) =>{
      console.log(`Book with ID ${id} removed from favourites`);
      dispatch(removeFavourite(id));
  }
     



    const pageVariants = {
    initial: { rotateY: -90, opacity: 0 },
  animate: { rotateY: 0, opacity: 1 },
  exit: { rotateY: 90, opacity: 0 },
};

const moodToKeyword = {
  '😄happy': "inspirational",
  '😞 sad': "healing",
  '🤩curious': "science",
  '😘romantic': "love",
 ' 😰anxious': "mindfulness",
 'none':'',
 
};
const moods= Object.keys(moodToKeyword);
    const queryWithMood = `${query||'search'} ${moodToKeyword[mood] || ''}`;





    //const url='https://www.googleapis.com/books/v1/volumes?q=search+terms&pagesize=40';
    const url=`https://www.googleapis.com/books/v1/volumes?q=${queryWithMood}&maxResults=40&key= ${import.meta.env.VITE_API_KEY}`;
    useEffect(() =>{
        book();
    },[mood]);

    const book =async() =>{
      setLoading(true);
        const response = await fetch( url  
    );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }   
        const data = await response.json();
        console.log(data);
        setBook(data);
        setLoading(false);
    }
   
 
  return (
    
   <>
    <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.5 }}
  >


   <div className=' bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200'>
    <h1 className="text-2xl font-bold mb-4 text-center bg-linear-65 from-orange-300 via-yellow-100 to-red-300 py-3 bg-blue-500  sticky top-0  drop-shadow-2xs pb-4  border-amber-100 z-50">📚 Book Finder</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Search for books..."
        />
        <button
          onClick={book}
          className="bg-linear-65 from-green-300 to-yellow-300  text-black px-4 py-2 rounded hover:scale-115 transition-all duration-300"
        >
          Search
        </button>
      </div>
       <div>
       
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-700">Mood Board Recommender</h1>
        <h1></h1>

      {/* Mood Selector */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {moods.map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-md ${
              mood === m
                ? "bg-purple-600 text-white scale-105"
                : "bg-white text-purple-600 hover:bg-purple-100"
            }`}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>


       </div>
       <div className='space-x-2 bg-linear-65 from-green-300 to-yellow-300 rounded-xl   p-2  transition-all duration-150 mx-5 w-fit'>Favourites Book : {bookid.length}
       <button className=' bg-linear-65 from-purple-300 to-red-300 rounded-xl hover:scale-105 p-3 transition-all duration-150 mx-5' onClick={() =>navigate('/favourites')}>   Explore</button></div>
{!loading ? 
   <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4   bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200'> 
    
        {books.items && books.items.map((item) => (
           

            <div key={item.id} className="bg-white/20 bg-opacity-40 backdrop-blur-lg border border-white border-opacity-30 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 object-fill ">
                <h2 className="text-xl font-bold flex justify-between">{item.volumeInfo.title}<span >
                  {(!bookid.includes(item.id) )?
                  
                  <button onClick={() => handleClick(item.id) } ><FaRegStar /></button>:<button onClick={() => handleRemoveClick(item.id)}> ❤️</button>}
                  </span></h2>
                <p className="mt-2 overflow-hidden  ">{item.volumeInfo.description?.slice(0,100)}...</p>
                <p className="mt-2">Author: {item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown'}</p>
                <p className="mt-2">Published Date: {item.volumeInfo.publishedDate}</p>
                <p className="mt-2">Publisher: {item.volumeInfo.publisher}</p>
           
                <p className="mt-2">Categories: {item.volumeInfo.categories ? item.volumeInfo.categories.join(', ') : 'None'}</p>
                
                 
                <img src={item.volumeInfo.imageLinks?.thumbnail} alt={item.volumeInfo.title} className="mt-4" />
                <div className='flex flex-row space-x-2'>
                 <NavLink to={item.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-yellow-400 text-white px-4 py-2 rounded-full hover:bg-yellow-500 hover:scale-115 transition-all duration-300">
                    Preview 
                </NavLink>    
                <NavLink to={item.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700 hover:scale-115 transition-all duration-300">
                    View Details
                </NavLink>    
                  

            </div>
            
            </div>

        ))}
      

       

   </div> :<div className=' bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 h-screen flex justify-center   items-center '> <AiOutlineLoading3Quarters className='animate-spin text-6xl flex ' />'</div>}
   </div>
  
 </motion.div>

   
   </>
  )
}
 