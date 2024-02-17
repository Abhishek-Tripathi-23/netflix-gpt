import React, { useEffect } from 'react'
import { addTrailerVideo } from '../src/utils/moviesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTION } from '../src/utils/constant';

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    
    const trailerMovie = useSelector(store => store.movies.trailerMovie);

    const getMovieVideo = async() => {
        const data = await fetch(
          'https://api.themoviedb.org/3/movie/'+ movieId +'/videos?language=en-US', API_OPTION );
          const json = await data.json();
          

          const filterData = json.results.filter((video) => video.type=="Trailer");
          const trailer = filterData.length? filterData[0] : json.results[0];
          
          dispatch(addTrailerVideo(trailer));

  }

  useEffect(() => {
      !trailerMovie && getMovieVideo();
  }, []);
}

export default useMovieTrailer;