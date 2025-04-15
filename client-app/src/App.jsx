import { useState } from "react";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./Pages/Login";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import Location from "./Pages/Location";
import Signup from "./Pages/Signup";
import Blogs from "./Pages/Blogs";
import Readblog from "./Pages/Readblog";
import AddBlog from "./Pages/Addblog";
import HomePage from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Traks from "./Pages/Track";
import Explore from "./Pages/Explore";
import Footer from "./Components/Footer";
import Timelineform from "./Pages/Timelineform";
import Profile from "./Pages/Profile";
import Community from "./Pages/community";
import Admin from "./Pages/Admin";
import Maps from "./Components/Maps"
import ProtectedRoute from "./Components/ProtectedRoute.jsx";


function App() {
  const username = localStorage.getItem("username");
  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/readblog/:id" element={<Readblog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/community" element={<Community />} />
          <Route path="/admin" element={<Admin />} />
          {/* <Route path="/maps" element={<Maps />} /> */}
          {/* <Route
            path="/community"
            element={
              <ProtectedRoute user={username} route="/login">
                <Community />
              </ProtectedRoute>
            }
          /> */}

          <Route path="/location" element={<Location />} />
          {/* <Route path="/timelineform" element={<Timelineform />} /> */}
        </Routes>
        <div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
