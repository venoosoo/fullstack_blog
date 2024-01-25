// App.js
import React from 'react';
import Index from './Index_page';
import About from './About';
import Category from './Category';
import { Route, Routes } from "react-router-dom";
import Post from './Post';
import Login from './Login';
import AuthProvider from './AuthProvider';
import Dashboard from './Dashboard';
import Register from './Register';


const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/category" element={<Category />} />
        <Route path="/index" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:postNumber" element={<Post />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
