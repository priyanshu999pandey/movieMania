import React from 'react'
import BannerHome from '../components/BannerHome'
import HorizontalScroll from '../components/HorizontalScroll'
import { useSelector } from 'react-redux'
import useFetch from "../hooks/useFetch"
import Footer from '../components/Footer'


const Home = () => {
  const trendingData = useSelector((state)=>state.movieoData.bannerData)
  const {data : NowPlaying, loading: nowPlayingLoading} = useFetch("/movie/now_playing");
  const {data : popular, loading: popularLoading}  = useFetch("/movie/popular");
  const {data : topRated, loading: topRatedLoading}  = useFetch("/movie/top_rated");
  const {data : popularTv, loading: popularTvLoading}  = useFetch("/tv/popular");
  const {data : topRatedTv, loading: topRatedTvLoading}  = useFetch("/tv/top_rated");
 

  

  return (
    <div>
     <BannerHome></BannerHome>
     <HorizontalScroll trending={true} data = {trendingData} heading={"Trending"} ></HorizontalScroll>
     <HorizontalScroll loading={nowPlayingLoading} data = {NowPlaying} heading={"Now Playing"} media_type={'movie'} />
     <HorizontalScroll loading={popularLoading} data = {popular} heading={"Popular"} media_type={'movie'} />
     <HorizontalScroll loading={topRatedLoading} data = {topRated} heading={"Top Rated"} media_type={'movie'} />
     <HorizontalScroll loading={popularTvLoading} data = {popularTv} heading={"Popular Tv Series"} media_type={'tv'} />
     <HorizontalScroll loading={topRatedTvLoading} data = {topRatedTv} heading={"Top Rated Tv Series"} media_type={'tv'} />

    </div>
  )
}

export default Home
