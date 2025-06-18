import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import CareerGuide from './components/CareerGuide';
import './styles.css';
import RoadmapBuilder from "./components/RoadmapBuilder";
import DayInLife from './components/DayInLife';
import InterviewAssistance from './components/InterviewAssistance';
import ResumeBuilder from './components/ResumeBuilder';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/career-guide" element={<CareerGuide />} />
        <Route path="/roadmap-builder" element={<RoadmapBuilder />} />
        <Route path="/day-in-life" element={<DayInLife />} />
        <Route path="/interview-assistance" element={<InterviewAssistance />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        {/* Additional routes can go here */}
        
      </Routes>
    </Router>
  );
}

export default App;
