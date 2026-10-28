import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import Card from '../components/Card';
import SkeletonCard from '../components/SkeletonCard';
import Footer from '../components/Footer';

const ExplorePage = () => {
  const { explore } = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data for current page
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/discover/${explore}`, {
        params: {
          page: pageNo
        }
      });

      setData((prev) => [...prev, ...response.data.results]);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [explore, pageNo]);

  // ✅ Reset data when explore type (movie/tv) changes
  useEffect(() => {
    setData([]);
    setPageNo(1);
    setTotalPages(0);
  }, [explore]);

  // ✅ Fetch whenever pageNo or explore changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ✅ Scroll handler with totalPages check and cleanup
  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (bottomReached && pageNo < totalPages) {
        setPageNo((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // ✅ cleanup
  }, [pageNo, totalPages]);

  return (
    <div className='pt-16'>
      <div className='mx-auto grid max-w-7xl grid-cols-2 justify-items-center gap-x-3 gap-y-8 px-3 sm:grid-cols-3 sm:gap-x-5 md:grid-cols-4 lg:gap-x-6 xl:grid-cols-5'>
        {data.map((exploreData) => (
          <Card key={exploreData.id} data={exploreData} media_type={explore} />
        ))}
        {loading && Array.from({ length: 8 }, (_, index) => (
          <SkeletonCard key={`skeleton-${index}`} />
        ))}
      </div>
     
    </div>
  );
};

export default ExplorePage;
