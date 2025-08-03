import React from 'react'
import BannerHome from '../components/BannerHome'
import HorizontalScroll from '../components/HorizontalScroll'
import { useSelector } from 'react-redux'
import useFetch from "../hooks/useFetch"
import Footer from '../components/Footer'


const Home = () => {
  const trendingData = useSelector((state)=>state.movieoData.bannerData)
  const {data : NowPlaying} = useFetch("/movie/now_playing");
  const {data : popular}  = useFetch("/movie/popular");
  const {data : topRated}  = useFetch("/movie/top_rated");
  const {data : popularTv}  = useFetch("/tv/popular");
  const {data : topRatedTv}  = useFetch("/tv/top_rated");
 

  

  return (
    <div>
     <BannerHome></BannerHome>
     <HorizontalScroll trending={true} data = {trendingData} heading={"Trending"} ></HorizontalScroll>
     <HorizontalScroll  trending={false} data = {NowPlaying} heading={"Now Playing"} media_type={'movie'} ></HorizontalScroll>
     <HorizontalScroll  trending={false} data = {popular} heading={"Popular"} media_type={'movie'} ></HorizontalScroll>
     <HorizontalScroll  trending={false} data = {topRated} heading={"Top Rated"} media_type={'movie'} ></HorizontalScroll>
     <HorizontalScroll  trending={false} data = {popularTv} heading={"Popular Tv Series"} media_type={'tv'} ></HorizontalScroll>
     <HorizontalScroll  trending={false} data = {topRatedTv} heading={"Top Rated Tv Series"} media_type={'tv'} ></HorizontalScroll>

    </div>
  )
}

export default Home