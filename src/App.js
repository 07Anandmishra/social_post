import React from 'react';
import './App.css';
import Login from './components/Login/Login';
import { Route, Routes,Navigate  } from 'react-router-dom';
import Register from './components/Register/Register';
import PostApp from './components/Posts/PostApp';


function App() {

  

  return (
    <>
    <Routes>
    <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PostApp />} />
    </Routes>
    </>
    
  );
}

export default App;
