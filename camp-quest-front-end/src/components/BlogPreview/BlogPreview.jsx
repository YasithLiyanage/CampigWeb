// components/BlogPreview.jsx
import React from 'react';
import './BlogPreview.css';

export function BlogPreview() {
  const blogPosts = [
    {
      title: '10 Essential Camping Tips for Beginners',
      excerpt:
        'Planning your first camping trip? Here are some essential tips to ensure a memorable and comfortable experience.',
      image:
        'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      date: 'Aug 15, 2023',
      readTime: '5 min read',
    },
    {
      title: 'Best Camping Destinations for Fall',
      excerpt:
        'Discover the most beautiful camping spots to enjoy the colorful fall foliage and cooler weather.',
      image:
        'https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      date: 'Sep 5, 2023',
      readTime: '4 min read',
    },
    {
      title: 'How to Choose the Right Camping Gear',
      excerpt:
        'A comprehensive guide to selecting the perfect camping equipment for your specific needs and adventures.',
      image:
        'https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80',
      date: 'Sep 20, 2023',
      readTime: '7 min read',
    },
  ];

  return (
    <section className="blog-preview">
      <div className="blog-container">
        <div className="blog-header">
          <h2 className="blog-title">
            Camping Tips & <span className="blog-title-accent">Guides</span>
          </h2>
          <a href="#" className="view-all-link">
            View all articles 
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12,5 19,12 12,19"></polyline>
            </svg>
          </a>
        </div>
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <div key={index} className="blog-card">
              <img
                src={post.image}
                alt={post.title}
                className="blog-image"
              />
              <div className="blog-content">
                <div className="blog-meta">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-excerpt">
                  {post.excerpt}
                </p>
                <a href="#" className="read-article-link">
                  Read Article 
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12,5 19,12 12,19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="blog-mobile-footer">
          <button className="mobile-view-all-btn">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
}