import React from 'react'
import rating from '../assets/rating.png'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Card = (props) => {
   const imageURL = useSelector((state) => state.movieoData.imageURL);
    const {data,index,trending,media_type} = props
    const mediaType = data.media_type ? data.media_type : media_type

  return (
    <Link key={data.id} to={"/"+mediaType+"/"+data.id} ><div className='relative hover:scale-110  hover:shadow-lg hover:shadow-yellow-400 transition duration-300  '>
        <div className=' cursor-pointer  hover:opacity-30   w-[150px] lg:w-[250px]   '>
           {
            data.poster_path ?  <img src={imageURL+data.poster_path} className='rounded-sm  '  /> : <div className=' text-center items-center py-40 text-2xl text-gray-500'> image not found </div>
           }
        </div>
        
       {
        trending &&  <div className= 'bg-black/70 absolute top-5 rounded-r-2xl px-2  '>
           <p className='text-lg'>#Trending {index} </p>
        </div>
       }
        
        <div className=' absolute bottom-0 bg-black/70 w-full h-20  p-2'>
            <p className='text-ellipsis line-clamp-1 text-xl font-semibold'>{data.name || data.title}</p>
            <div className='flex justify-between items-center mt-2 text-gray-400'>
             <p>{moment(data.release_date).format("MMM Do YY")  ||moment(data.first_air_date).format("MMM Do YY") }</p>
             <p className='flex'><img className='w-5 mx-2  ' src={rating} />{data.vote_average?.toFixed(1)}</p>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default Card