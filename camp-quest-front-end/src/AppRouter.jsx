import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { Blog } from './pages/Blog';
import { AddBlog } from './pages/AddBlog';
import { NavBar } from './components/NavBar';

export function AppRouter() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/add" element={<AddBlog />} />
      </Routes>
    </BrowserRouter>
  );
}
