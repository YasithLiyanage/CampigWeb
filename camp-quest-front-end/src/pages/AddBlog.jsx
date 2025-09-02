import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Upload } from 'lucide-react';
import './AddBlog.css';

export function AddBlog() {
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState({
    title: '',
    category: 'Camping Tips',
    content: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the blog post to your backend
    console.log('Blog post to be saved:', blogPost);
    // For now, just navigate back to the blog page
    navigate('/blog');
  };

  const handleCancel = () => {
    navigate('/blog');
  };

  return (
    <div className="add-blog-page">
      <div className="add-blog-header">
        <h1 className="add-blog-title">
          Create New <span className="title-highlight">Blog Post</span>
        </h1>
        <p className="add-blog-subtitle">
          Share your camping knowledge and experiences
        </p>
      </div>

      <div className="add-blog-container">
        <div className="add-blog-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={blogPost.title}
                onChange={handleChange}
                placeholder="Enter blog title"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={blogPost.category}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Camping Tips">Camping Tips</option>
                <option value="Gear Reviews">Gear Reviews</option>
                <option value="Camping Recipes">Camping Recipes</option>
                <option value="Destinations & Locations">
                  Destinations & Locations
                </option>
                <option value="Beginner Guides">Beginner Guides</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={blogPost.content}
                onChange={handleChange}
                placeholder="Write your blog content here..."
                className="form-textarea"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Featured Image</label>
              <div className="image-upload-area">
                <div className="image-upload-content">
                  <Upload size={48} className="upload-icon" />
                  <p className="upload-text">
                    Upload a featured image for your blog
                  </p>
                  <button type="button" className="upload-button">
                    Select Image
                  </button>
                </div>
              </div>
              <div className="url-input-section">
                <p className="url-label">Or enter image URL:</p>
                <input
                  type="url"
                  name="imageUrl"
                  value={blogPost.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={handleCancel}
                className="cancel-button"
              >
                Cancel
              </button>
              <button type="submit" className="submit-button">
                Publish Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}