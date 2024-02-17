import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-6 md:px-12 absolute text-white bg-gradient-to-r from-black'>
        <h1 className='text:2xl md:text-4xl font-bold'>{title}</h1>
        <p className='hidden md:inline-block py-6 text-lg w-1/4'>{overview}</p>
        <div className='my-2 md:m-0'>
            <button className='bg-white text-black py-1 md:px-4 px-2 text-lg rounded-lg hover:bg-opacity-70 mx-2'> Play button</button>
            <button className='bg-gray-400 hidden md:inline-block text-white p-4 px-4 text-lg rounded-lg mx-2 hover:bg-opacity-70'> More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle;