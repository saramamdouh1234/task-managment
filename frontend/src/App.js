import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TaskList from './components/TaskList';
import api from './services/api';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.setAuthToken(token); 
      setLoggedIn(true);       
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Task Management APP</h1>
        <Routes>
          <Route 
            path="/register" 
            element={loggedIn ? <Navigate to="/tasks" /> : <Register />} 
          />
          <Route 
            path="/login" 
            element={<Login onLogin={() => setLoggedIn(true)} />} 
          />
          <Route 
            path="/tasks" 
            element={loggedIn ? <TaskList /> : <Navigate to="/login" />} 
          />
          <Route 
            path="*" 
            element={<Navigate to={loggedIn ? "/tasks" : "/login"} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
