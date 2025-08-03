import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import Footer from "../components/Footer";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // decode “…?q=…” manually → spaces back
  const query = location.search.startsWith("?q=")
    ? location.search.slice(3).split("%20").join(" ")
    : "";

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!query) {
      setData([]);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get("/search/multi", {   // movie‑only endpoint
          params: { query, page: 1 }
        });
        setData(res.data.results || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="py-16">

      <div className=" sticky z-20 bg-white w-full l text-neutral-900  top-16 mb-4 lg:hidden ">
        <input type="text" placeholder="seach here..." onChange={(e)=>navigate(`/search?q=${e.target.value}`)} className="border-none outline-none w-full h-10 px-4 text-neutral-900 font-bold"  ></input>
      </div>

      <div className="flex flex-wrap gap-10 justify-center lg:20">
        {data.map((item, idx) => (
          <Card key={item.id || idx} data={item} media_type={item.media_type} />
        ))}
      </div>
      
    </div>
  );
};

export default SearchPage;
