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
    <div className="fixed top-0 w-full h-16 bg-neutral-800 opacity-80 flex items-center z-40 px-15">

      {/* logo */}
      <NavLink to="/">
        <div className="flex">
          <img src={logo} alt="logo" width={120} />
          <span className="pt-2 text-yellow-500 text-sm px-1">
            <span className="text-red-300">M</span>ANIA
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
