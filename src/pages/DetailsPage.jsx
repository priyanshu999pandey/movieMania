import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails.jsx";
import { useSelector } from "react-redux";
import Divider from "../components/Divider";
import useFetch from "../hooks/useFetch";
import HorizontalScroll from "../components/HorizontalScroll";
import { useEffect } from "react";
import VideoPlay from "../components/VideoPlay.jsx";

const DetailsPage = () => {
  const imageURL = useSelector((s) => s.movieoData.imageURL);
  const params    = useParams();
  useEffect(() => {
  window.scrollTo(0, 0); // ⬅️ Scroll to top when ID changes
}, [params.id]);

  const { data }  = useFetchDetails(`/${params.explore}/${params.id}`);
  const { data: character } = useFetchDetails(`/${params.explore}/${params.id}/credits`);
  const { data: similar }   = useFetch(`${params.explore}/${params.id}/similar`);
  const { data: recs }      = useFetch(`${params.explore}/${params.id}/recommendations`);

  const genre    = data?.genres ?? [];
  const duration = Number(data?.runtime / 60).toFixed(1);
  const [playVideo,setPlayVideo] = useState(false);
  const [playVideoId,setPlayVideoId] = useState('')

  return (
    <div className="relative w-full">
      {/* ───────────────────────────────── Backdrop ─────────────────────────────── */}
      <div className="relative">
        <img
          src={imageURL + data?.backdrop_path}
          className="w-full h-[300px] object-cover opacity-40"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent h-[300px]" />
      </div>

      {/* ───────────────────────────── Poster + Details wrapper ─────────────────── */}
      {/* lg: keep your original overlay • md/sm: horizontal flex  */}
      <div className="flex flex-col md:flex-row gap-6 px-5 lg:block">
        {/* Poster */}
        <div
          className="
            relative mx-auto
            md:mx-0
            lg:absolute lg:top-40 lg:left-17
           
          "
        >
          <img
            src={imageURL + data?.poster_path}
            className="
              w-40  h-60
              sm:w-48 sm:h-72
              md:w-56 md:h-80
              lg:w-70 lg:h-90
              object-cover rounded-lg
            "
            
          />
           <button className="w-49 mt-2  bg-white py-2 px-4 text-black rounded-sm hover:text-white bg-gradient-to-l hover:from-neutral-500 hover:to-red-900 transition-all duration-300 lg:w-70">
            Play Now
          </button>
         
        </div>
        

        {/* Text details */}
        <div className="text-white flex-1 lg:ml-95 mt-6 md:mt-0">
          <div>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              {data?.title || data?.name}
            </p>
            <p className="text-gray-600 text-sm sm:text-base">{data?.tagline}</p>
          </div>
          <Divider />

          <div className="flex flex-wrap gap-4 sm:gap-6 text-gray-600 text-sm sm:text-base">
            <p>Rating : {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>
              {data?.runtime
                ? `Duration : ${duration} hrs`
                : `Seasons : ${data?.number_of_seasons}`}
            </p>
            <span>|</span>
            <p>Status : {data?.status}</p>
          </div>
          <Divider />

          <div>
            <p className="text-lg sm:text-xl">Overview</p>
            <p className="text-gray-600 text-sm sm:text-base">{data?.overview}</p>
          </div>
          <Divider />

          <div className="flex flex-wrap gap-3 text-gray-600 text-sm sm:text-base">
            <span>Genre :</span>
            {genre.map((g) => (
              <p key={g.id}>{g.name}</p>
            ))}
          </div>
          <Divider />
        </div>
      </div>

      {/* ────────────────────────────────── Cast ───────────────────────────────── */}
      <div className="px-5 lg:pl-100 py-6">
        <p className="text-xl font-bold text-white mb-3">Cast :</p>
        <div className="flex flex-wrap gap-6">
          {character?.cast
            ?.filter((c) => c.profile_path)
            .map((c) => (
              <img
                key={c.id}
                src={imageURL + c.profile_path}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                alt=""
              />
            ))}
        </div>
      </div>

      <Divider />

      {/* ─────────────────────── Similar & Recommended rows ───────────────────── */}
      <HorizontalScroll
        data={similar}
        heading={`Similar ${params.explore}`}
        media_type={params.explore}
      />
      <HorizontalScroll
        data={recs}
        heading={`Recommended ${params.explore}`}
        media_type={params.explore}
      />

      {/* <VideoPlay></VideoPlay> */}
    </div>
  );
};

export default DetailsPage;
