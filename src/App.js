import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import LoadingBar from "react-top-loading-bar";
import NoteState from "./context/notes/NotesState";

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <div className="">
        <LoadingBar color="#f11946" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;