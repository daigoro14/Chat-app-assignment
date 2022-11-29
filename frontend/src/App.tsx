import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import axios from "axios";
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EnterNamePage from './pages/EnterNamePage';

export const url = process.env.REACT_APP_CHATAPP_API || "http://localhost:8080";

function App() {
  return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<ChatPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/name" element={<EnterNamePage/>}/>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
