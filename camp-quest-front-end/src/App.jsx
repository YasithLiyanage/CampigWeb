// import React from 'react';
// import { Blog } from './pages/Blog';
// import './App.css';

// function App() {

//   return (
//     <div className="app">
//       <Blog />
//     </div>
//   );
// }

// export default App


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Blog } from './pages/Blog';
import { AddBlog } from './pages/AddBlog';
import { EditBlog } from './pages/EditBlog';
import { BlogDetails } from './pages/BlogDetails';
import { NavBar } from './components/NavBar';
import './App.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/blog/add" element={<AddBlog />} />
          <Route path="/blog/edit/:id" element={<EditBlog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
