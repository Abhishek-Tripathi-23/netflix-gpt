import React, { useRef } from 'react'
import lang from '../utils/languageConstant';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openai';
import { API_OPTION } from '../utils/constant';
import { addGPTMovieResult } from '../utils/gptSlice';

const GPTSearchBar = () => {
  const langKey= useSelector((store) => store?.config?.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchTmdbMovie = async (movie) => {
     const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+
     '&include_adult=false&language=en-US&page=1', API_OPTION)
     const json = await data.json();
     return json.results;
  };
  

  const handleGPTSearchClick = async () => {
    console.log(searchText.current.value);

    const gptQuery = "Act as a movie Recommendation system and suggest movies based on queries "+ searchText.current.value + 
    "Get the movies in a single line and separated by comma(,). For example- Kahani, Jessica, Newton, Hera Pheri. Suggest only 5 movies as shown in the example format only";

    const gptResult = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });
    console.log(gptResult.choices?.[0]?.message?.content);
    const gptMovies = gptResult.choices?.[0]?.message?.content.split(",");

      const promiseArray = gptMovies.map((movie)=> searchTmdbMovie(movie));

      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);

      dispatch(addGPTMovieResult({movieNames: gptMovies , movieResults: tmdbResults}));
  };

  return (
    <div className='pt-[50%] md:pt-[10%] flex justify-center'>
        <form className=' w-full md:w-1/2 bg-black grid grid-cols-12'
        onSubmit={(e)=>e.preventDefault()}>
            <input
            ref= {searchText}
            type = 'text'
            className='p-4 m-4 col-span-9'
            placeholder={lang[langKey]?.gptSearchPlaceholder}
            />
            <button className='col-span-3 m-4 py-2 px-4 bg-red-600 text-white rounded-lg'
            onClick={handleGPTSearchClick}>
                {lang[langKey]?.search}
                </button>

        </form>
    </div>
  )
}

export default GPTSearchBar;