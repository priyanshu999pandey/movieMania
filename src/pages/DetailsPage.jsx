import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetchDetails from "../hooks/useFetchDetails.jsx";
import useFetch from "../hooks/useFetch";
import Divider from "../components/Divider";
import HorizontalScroll from "../components/HorizontalScroll";
import VideoPlay from "../components/VideoPlay.jsx";

const DetailsPage = () => {
  const imageURL = useSelector((s) => s.movieoData.imageURL);
  const params = useParams();

  const { data } = useFetchDetails(`/${params.explore}/${params.id}`);
  const { data: character } = useFetchDetails(`/${params.explore}/${params.id}/credits`);
  const { data: similar } = useFetch(`${params.explore}/${params.id}/similar`);
  const { data: recs } = useFetch(`${params.explore}/${params.id}/recommendations`);

  const genre = data?.genres ?? [];
  const duration = Number(data?.runtime / 60).toFixed(1);

  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  return (
    <div className="relative w-full text-white">

      {/* ───── Backdrop ───── */}
      <div className="relative h-[45vh] md:h-[60vh]">
        <img
          src={imageURL + data?.backdrop_path}
          className="w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* ───── Main Info Section ───── */}
      <div className="relative z-10 px-4 md:px-10 -mt-40 flex flex-col md:flex-row gap-8">

        {/* Poster */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <img
            src={imageURL + data?.poster_path}
            className="w-48 md:w-64 rounded-xl shadow-2xl"
            alt=""
          />

          <button
            onClick={() => setPlayVideo(true)}
            className="mt-4 w-full bg-gradient-to-r from-red-600 to-red-800 py-2 rounded-lg font-semibold hover:scale-105 transition"
          >
            ▶ Play Trailer
          </button>
        </div>

        {/* Details */}
        <div className="flex-1 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 md:p-8 shadow-xl">

          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            {data?.title || data?.name}
          </h1>

          <p className="text-gray-400 italic mb-4">{data?.tagline}</p>

          <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-300 mb-4">
            <span>⭐ {Number(data?.vote_average).toFixed(1)}</span>
            <span>|</span>
            <span>
              {data?.runtime
                ? `${duration} hrs`
                : `${data?.number_of_seasons} Seasons`}
            </span>
            <span>|</span>
            <span>{data?.status}</span>
          </div>

          <Divider />

          <p className="text-lg font-semibold mb-1">Overview</p>
          <p className="text-gray-300 leading-relaxed mb-4">{data?.overview}</p>

          <Divider />

          <div className="flex flex-wrap gap-2 text-sm text-gray-300">
            <span className="font-semibold text-white">Genres:</span>
            {genre.map((g) => (
              <span key={g.id} className="bg-white/10 px-3 py-1 rounded-full">
                {g.name}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* ───── Cast ───── */}
      <div className="px-4 md:px-10 mt-12">
        <h2 className="text-xl font-bold mb-4">Cast</h2>

        <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-3">
          {character?.cast
            ?.filter((c) => c.profile_path)
            .slice(0, 15)
            .map((c) => (
              <div key={c.id} className="text-center min-w-[80px]">
                <img
                  src={imageURL + c.profile_path}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-2 border border-white/20"
                  alt=""
                />
                <p className="text-xs text-gray-300 line-clamp-1">{c.name}</p>
              </div>
            ))}
        </div>
      </div>

      <Divider />

      {/* ───── Similar & Recommendations ───── */}
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

      {/* ───── Video Modal ───── */}
      {playVideo && (
        <VideoPlay
          close={setPlayVideo}
          media_type={params.explore}
          id={params.id}
        />
      )}
    </div>
  );
};

export default DetailsPage;
