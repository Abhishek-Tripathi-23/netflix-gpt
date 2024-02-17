import { useDispatch, useSelector } from "react-redux"
import { API_OPTION } from "../src/utils/constant";
import { addNowPlayingMovies } from "../src/utils/moviesSlice";
import { useEffect } from "react";



const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    
    const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);

    const getNowPlayingMovies = async() => {
        const data = await fetch (
          'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
          API_OPTION
        );
        const json = await data.json();
        
        dispatch(addNowPlayingMovies(json.results));
      };
    
      useEffect(() => {
        !nowPlayingMovies && getNowPlayingMovies();
      }, [])
}
export default useNowPlayingMovies;