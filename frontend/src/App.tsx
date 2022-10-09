import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import './App.css';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<ChatPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
