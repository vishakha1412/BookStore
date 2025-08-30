 import React, { use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaRegStar } from "react-icons/fa";
import { addFavourite, removeFavourite } from '../../features/Favourites';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const Favourites = () => {

  const array = useSelector((state) => state.favourites.books); // array of book IDs
  
 const favouriteIds = array.filter(item => item !== "");


  
  const [books, setBooks] = useState([]);
  
    const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
     const handleClick=(id) =>{
       
           console.log(`Book with ID ${id} added to favourites`);
           console.log(bookid.indexOf(id)>=0);
           dispatch(addFavourite(id));
          
           
           
       }
       const handleRemoveClick=(id) =>{
         console.log(`Book with ID ${id} removed from favourites`);
         dispatch(removeFavourite(id));
     }
      
    // const url=`https://www.googleapis.com/books/v1/volumes?q=${id}&maxResults=40&key= ${import.meta.env.VITE_API_KEY}`

  const fetchBooks = async () => {
    setLoading(true)
  try {
    const fetchedBooks = await Promise.allSettled(
      favouriteIds.map(async (id) => {
       // const url=`https://www.googleapis.com/books/v1/volumes?q=${id}&maxResults=40&key= ${import.meta.env.VITE_API_KEY}`;
       const url=`https://www.googleapis.com/books/v1/volumes/${id}`
        console.log("Fetching book with ID:", id);

        const res = await fetch( url);
        const data = await res.json();
        return data;
      })
    );
    const successfulBooks = fetchedBooks
    .filter(result => result.status === "fulfilled")
    .map(result => result.value);

    setBooks(successfulBooks);
    console.log("Fetched favourite books:", fetchedBooks);
  } catch (error) {
    console.error("Error fetching favourite books:", error);
    setBooks([]);
  }
  setLoading(false);
};

useEffect(() => { fetchBooks()}, []);

  //if (loading) return <div>Loading favourites...</div>;
  if (favouriteIds.length === 0) return <div>{favouriteIds.length}No favourite books found.</div>;

  return (
    <div className='min-h-screen bg-gradient-to-br  from-yellow-100 via-pink-100 to-purple-200'>
    <h1 className="text-2xl font-bold mb-4 text-center bg-linear-65 from-orange-300 via-yellow-100 to-red-300 py-3 bg-blue-500  sticky top-0  drop-shadow-2xs pb-4  border-amber-100 z-50">📚 Book Finder</h1>
    {!loading ?
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">

      {books.map((book) => {
      
        const info = book.volumeInfo;
          //console.log("book.id:", book.id);
//console.log("favouriteIds:", favouriteIds);
    
     ; // Skip books not in favourites
   


        return (
          <div key={book.id}   className="bg-white/20 bg-opacity-40 backdrop-blur-lg border border-white border-opacity-30 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 object-fill ">
               
              <h2 className="text-xl font-bold flex justify-between">{info.title}<span > {(!favouriteIds.includes(book.id) )?
                                
            <button onClick={() => handleClick(book.id) } ><FaRegStar /></button>:<button onClick={() => handleRemoveClick(book.id)}> ❤️</button>}</span></h2>
            <p className="text-sm text-gray-600">{info.authors?.join(', ')}</p>
            {info.imageLinks?.thumbnail && (
              <img src={info.imageLinks.thumbnail} alt={info.title} className="mt-2" />
            )}
            <p className="mt-2 text-sm">{info.description?.slice(0, 100)}...</p>
             <div className='flex flex-row space-x-2'>
                 <NavLink to={info.previewLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-yellow-400 text-white px-4 py-2 rounded-full hover:bg-yellow-500 hover:scale-115 transition-all duration-300">
                    Preview 
                </NavLink>    
                <NavLink to={info.infoLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700 hover:scale-115 transition-all duration-300">
                    View Details
                </NavLink>    
                  

            </div>
          </div>
        );
      })}
    </div>:<div className=' bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 h-screen flex justify-center   items-center '> <AiOutlineLoading3Quarters className='animate-spin text-6xl flex ' />'</div>}
    </div>
  );
};


  export default Favourites
  