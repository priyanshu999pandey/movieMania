import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import Card from "./Card"
import moment from "moment"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const HorizontalScroll = (props) => {

    const {data,heading,media_type} = props
    const imageURL = useSelector( (state)=> state.movieoData.imageURL)
    const containerRef = useRef();

    function slideRighthandler(){
      containerRef.current.scrollLeft += 800;
    }
    function slideLefthandler(){
      containerRef.current.scrollLeft -= 800;
    }




  return (
    <div className='ml-10 mt-20 relative '>
      <h2 className='text-2xl  my-4 text-white font-bold lg:text-4xl '>{heading}</h2>
      <div ref={containerRef} className='flex gap-10 overflow-hidden overflow-x-scroll scrollbar-hide scroll-smooth transition-all lg:8   '>
        {
          data.map( (data,index)=>{
            return(
              
                <Card  data={data} imageURL={imageURL} index = {index+1} trending={props.trending} media_type={media_type} ></Card>
                
            )
          })
        }
        </div>

        <div className=' hidden absolute top-50 w-full  justify-between items-center lg:flex'>
         <button onClick={slideLefthandler} ><FaAngleLeft className='w-10 h-10'></FaAngleLeft></button>
         <button onClick={slideRighthandler} ><FaAngleRight className='w-10 h-10'></FaAngleRight></button>
        </div>
      
    </div>
  )
}

export default HorizontalScroll