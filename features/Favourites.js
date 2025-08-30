 import {createSlice} from '@reduxjs/toolkit';

const favouritesSlice =createSlice({
    name:'favourites',
    initialState: {
        books: [],
    },
    reducers:{
        addFavourite: (state, action) => {
            const book = action.payload;
            if(book && !state.books.includes(book))
            state.books.push(book);
        },
        removeFavourite: (state, action) => {
              const bookId = action.payload;
                state.books = state.books.filter(id => id !== bookId);


         
        },
    },
    clearFavourites:(state,action)=> {
        state.books = [];
    
    }
})

export default favouritesSlice.reducer;
export const { addFavourite, removeFavourite, clearFavourites } = favouritesSlice.actions;