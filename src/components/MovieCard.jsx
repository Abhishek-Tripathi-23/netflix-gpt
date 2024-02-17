import React from 'react'
import { IMG_CDN_URL } from '../utils/constant';

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
  return (
    <div className='w-28 md:w-40 px-2'>
        <img alt="Movie card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};

export default MovieCard;