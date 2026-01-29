import React from 'react'
import { IoClose } from 'react-icons/io5'
import useFetchDetails from '../hooks/useFetchDetails'

const VideoPlay = ({ close, media_type, id }) => {
  const { data: video } = useFetchDetails(`/${media_type}/${id}/videos`)

  const trailer =
    video?.results?.find(
      item =>
        item.type === 'Trailer' &&
        item.site === 'YouTube' &&
        item.official === true
    ) ||
    video?.results?.find(
      item => item.type === 'Trailer' && item.site === 'YouTube'
    )

  const videoKey = trailer?.key

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 pt-20">
      <div className="relative bg-black rounded-xl shadow-2xl w-full max-w-5xl aspect-video overflow-hidden">

        {/* Close Button */}
        <button
          onClick={() => close(false)}
          className="absolute top-3 right-3 z-10 text-white bg-black/60 hover:bg-red-600 p-2 rounded-full transition"
        >
          <IoClose size={22} />
        </button>

        {/* Video / Fallback */}
        {videoKey ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title="Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white text-lg">
            Trailer not available 😢
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoPlay
