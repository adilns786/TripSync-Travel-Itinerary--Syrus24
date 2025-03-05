import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const handleClickLogin = () => {
    navigate("/login");
  };

  const handleClickProfile = () => {
    navigate("/profile");
  };

  const [emailExists, setEmailExists] = useState(false);

  useEffect(() => {
    // Check if email exists in local storage
    const storedEmail = localStorage.getItem("email");
    setEmailExists(!!storedEmail); // Set emailExists to true if email is found, false otherwise
  }, []); // Run the effect only once on component mount

  return (
    <header className="text-gray-600 body-font bg-white h-15 p-3 border-b border-gray-500 my-0.2 font-sans font-semibold px-52">
      <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div>
          <img
            src={logoImage}
            alt="Logo"
            className="w-10 h-10 p-2 bg-blue-200 rounded-full"
          />
        </div>
        <span className="ml-3 text-2xl font-extrabold font-serif text-black">
          TripSync
        </span>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center pl-10 pr-10">
          <Link to="/" className="mr-5 text-zinc-950 px-3">
            Home
          </Link>
          <Link to="/explore" className="mr-5 text-zinc-950 px-3">
            Explore
          </Link>
          <Link to="/blogs" className="mr-5 text-zinc-950 px-3">
            Blogs
          </Link>
          <Link to="/community" className="mr-5 text-zinc-950 px-3">
            Community
          </Link>
        </nav>

        {emailExists ? (
          <button
            className="inline-flex items-center bg-black text-white border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 hover:text-black rounded-full text-base mt-4 md:mt-0"
            onClick={handleClickProfile}
          >
            Profile
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path d="M12 2c3.313 0 6 2.687 6 6s-2.687 6-6 6-6-2.687-6-6 2.687-6 6-6zM12 14c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8z"></path>
            </svg>
          </button>
        ) : (
          <button
            className="inline-flex items-center bg-black text-white border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 hover:text-black rounded-full text-base mt-4 md:mt-0"
            onClick={handleClickLogin}
          >
            Login
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
