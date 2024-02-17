import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showGPTSearch: false,
        movieNames: null,
        movieResults: null,
    },
    reducers: {
         toggleGPTSearchView: (state) =>{
         state.showGPTSearch = !state.showGPTSearch;
         },
         addGPTMovieResult:(state, action) => {
            const {movieNames, movieResults} = action.payload;
            state.movieNames= movieNames;
            state.movieResults= movieResults;
         },
    },
});

export const {toggleGPTSearchView, addGPTMovieResult} = gptSlice.actions;
export default gptSlice.reducer;