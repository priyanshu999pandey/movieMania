import React from "react";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-gray-400 mt-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">

          {/* Brand */}
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white mb-3">Movie Mania</h2>
            <p className="text-sm leading-relaxed">
              Discover trending movies, TV shows, trailers, and cast details in
              one place. Built with React & TMDB API.
            </p>
          </div>

          {/* Explore */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/" className="hover:text-white transition">Movies</Link></li>
              <li><Link to="/" className="hover:text-white transition">TV Shows</Link></li>
              <li><Link to="/" className="hover:text-white transition">Trending</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-semibold mb-3">Follow Me</h3>
            <div className="flex justify-center sm:justify-start gap-4 text-xl">
              <a href="#" className="hover:text-white transition"><FaGithub /></a>
              <a href="#" className="hover:text-white transition"><FaLinkedin /></a>
              <a href="#" className="hover:text-white transition"><FaTwitter /></a>
              <a href="#" className="hover:text-white transition"><FaYoutube /></a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs sm:text-sm">
          <p>
            © {new Date().getFullYear()} Movieo. Made with{" "}
            <FaHeart className="inline text-red-500 mx-1" /> by Priyanshu Pandey
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
