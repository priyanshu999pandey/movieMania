import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import Card from '../components/Card';
import Footer from '../components/Footer';

const ExplorePage = () => {
  const { explore } = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // ✅ Fetch data for current page
  const fetchData = async () => {
    try {
      const response = await axios.get(`/discover/${explore}`, {
        params: {
          page: pageNo
        }
      });

      setData((prev) => [...prev, ...response.data.results]);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Reset data when explore type (movie/tv) changes
  useEffect(() => {
    setData([]);
    setPageNo(1);
    setTotalPages(0);
  }, [explore]);

  // ✅ Fetch whenever pageNo or explore changes
  useEffect(() => {
    fetchData();
  }, [pageNo, explore]);

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
      <div className='flex flex-wrap gap-15 justify-center lg:gap-20'>
        {data.map((exploreData, index) => (
          <Card key={exploreData.id} data={exploreData} media_type={explore} />
        ))}
      </div>
     
    </div>
  );
};

export default ExplorePage;
