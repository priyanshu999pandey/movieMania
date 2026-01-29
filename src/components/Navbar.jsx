import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { GoSearch } from "react-icons/go";

const Navbar = () => {
  const location  = useLocation();
  const navigate   = useNavigate();

  // read “…?q=…” → turn %20 back into spaces
  const initial   = location.search.startsWith("?q=")
    ? location.search.slice(3).split("%20").join(" ")
    : "";

  const [search, setSearch] = useState(initial);

  // keep input synced if user lands on /search?q=…
  useEffect(() => {
    if (location.search.startsWith("?q=")) {
      setSearch(location.search.slice(3).split("%20").join(" "));
    } else {
      setSearch("");
    }
  }, [location.search]);

  // ───────────────────────────────────────────────
  // on every keystroke: update state + navigate
  // ───────────────────────────────────────────────
  const changeHandler = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim()) {
      const safe = value.trim().split(" ").join("%20");      // simple “encoding”
      navigate(`/search?q=${safe}`, { replace: true });      // replace to avoid long history
    }
  };

  // keep <form> for accessibility but do nothing special on submit
  const submitHandler = (e) => e.preventDefault();

  return (
    <div className="fixed top-0 w-full h-16 bg-neutral-800 opacity-90 flex items-center z-20 px-10">

      {/* logo */}
     <NavLink to="/" className="group select-none">
  <div
    className="
      relative flex items-center gap-2 px-4 py-1.5
      rounded-full
      bg-gradient-to-b from-red-500 via-red-700 to-red-900
      shadow-[inset_0_1px_3px_rgba(255,255,255,0.25),0_6px_14px_rgba(0,0,0,0.6)]
      overflow-hidden
      transition-transform duration-300
      group-hover:scale-105
    "
  >
    {/* Cylindrical highlight */}
    <span className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/25 to-transparent opacity-40 pointer-events-none" />

    {/* Reflection sweep */}
    <span className="absolute -left-1/2 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-slide" />

    {/* Subtle glow */}
    <span className="absolute -inset-1 rounded-full bg-red-500/40 blur-md opacity-0 group-hover:opacity-100 transition duration-300" />

    {/* MOVIE */}
    <h1
      className="
        relative text-lg sm:text-xl font-black tracking-wider
        bg-gradient-to-r from-white via-yellow-200 to-yellow-400
        bg-clip-text text-transparent
        drop-shadow-[0_0_6px_rgba(255,200,100,0.7)]
      "
    >
      MOVIE
    </h1>

    {/* MANIA */}
    <span className="relative text-[10px] sm:text-xs font-extrabold text-yellow-200 -mt-1 tracking-[0.25em]">
      <span className="text-white">M</span>ANIA
    </span>
  </div>
</NavLink>


      {/* category links */}
      <div className="hidden lg:flex gap-2 px-8">
        <NavLink to="/tv"    className={({isActive}) => `hover:text-amber-200 ${isActive && "font-bold text-amber-600"}`}>Tv shows</NavLink>
        <NavLink to="/movie" className={({isActive}) => `hover:text-amber-200 ${isActive && "font-bold text-amber-600"}`}>Movies</NavLink>
      </div>

      {/* search */}
      <div className="ml-auto flex justify-center items-center gap-8">
        <form className="flex items-center" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Search here...."
            className="outline-none bg-transparent border-none hidden lg:block"
            value={search}
            onChange={changeHandler}
          />
          <button type="submit" className="text-2xl text-white hidden lg:block">
            <GoSearch />
          </button>
        </form>

        {/* user icon */}
        <FaUserCircle className="h-8 w-8 text-white" />
      </div>
    </div>
  );
};

export default Navbar;
