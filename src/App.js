import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import LoadingBar from "react-top-loading-bar";
import NoteState from "./context/notes/NotesState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LandingPage from "./components/LandingPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <NoteState isLoggedIn={isLoggedIn}> {/* Pass isLoggedIn to NoteState */}
      <Router>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <div className="">
          <LoadingBar color="#ffd52e" />
          <Routes>
            {/* If the user is logged in, show Home, otherwise show Welcome */}
            <Route path="/" element={isLoggedIn ? <Home /> : <LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path="/signup"
              element={<Signup handleLogin={handleLogin} />}
            />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
};

export default App;
