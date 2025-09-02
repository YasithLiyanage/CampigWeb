import React, { useMemo, useState } from 'react';
import { BlogCard } from '../components/BlogCard';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Blog.css';

// Blog post data
const initialBlogPosts = [
  {
    id: '1',
    title: 'Top 10 Essential Camping Gear for Beginners',
    imageUrl:
      'https://uploadthingy.s3.us-west-1.amazonaws.com/9SZfwKUZLQ3qAKhXGxFR7g/camp.jpg',
    category: 'Gear Reviews',
    date: '15/06/2023',
    excerpt:
      'Camping is a wonderful way to enjoy nature and disconnect from the hustle and bustle of everyday life.',
    reactions: {
      likes: 24,
      loves: 12,
      smiles: 8,
      stars: 15,
    },
  },
  {
    id: '2',
    title: 'How to Choose the Perfect Campsite',
    imageUrl:
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Camping Tips',
    date: '02/07/2023',
    excerpt:
      'Selecting the right campsite can make or break your camping experience.',
    reactions: {
      likes: 18,
      loves: 7,
      smiles: 4,
      stars: 9,
    },
  },
  {
    id: '3',
    title: 'Campfire Cooking: 5 Easy Recipes for Your Next Trip',
    imageUrl:
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Camping Recipes',
    date: '20/07/2023',
    excerpt: "There's something magical about cooking over an open fire.",
    reactions: {
      likes: 32,
      loves: 21,
      smiles: 14,
      stars: 18,
    },
  },
  {
    id: '4',
    title: 'Best Mountain Camping Destinations in the US',
    imageUrl:
      'https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Destinations & Locations',
    date: '05/08/2023',
    excerpt:
      'Discover the most breathtaking mountain camping spots across the United States.',
    reactions: {
      likes: 42,
      loves: 28,
      smiles: 12,
      stars: 23,
    },
  },
  {
    id: '5',
    title: 'Camping 101: Everything You Need to Know Before Your First Trip',
    imageUrl:
      'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Beginner Guides',
    date: '12/06/2023',
    excerpt:
      'A complete step-by-step guide for first-time campers to ensure an enjoyable outdoor experience.',
    reactions: {
      likes: 56,
      loves: 34,
      smiles: 19,
      stars: 27,
    },
  },
  {
    id: '6',
    title: 'The Ultimate Sleeping Bag Comparison',
    imageUrl:
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Gear Reviews',
    date: '30/07/2023',
    excerpt:
      'We tested 15 different sleeping bags to find the best options for every season and budget.',
    reactions: {
      likes: 38,
      loves: 15,
      smiles: 7,
      stars: 21,
    },
  },
];

// Category definitions with descriptions
const categories = [
  {
    value: 'all',
    label: 'All Categories',
    description: 'View all blog posts',
  },
  {
    value: 'Gear Reviews',
    label: 'Gear Reviews',
    description: 'Reviews of tents, backpacks, sleeping bags, lanterns, etc.',
  },
  {
    value: 'Camping Tips',
    label: 'Camping Tips',
    description:
      'Practical advice, hacks, and how-to guides for better camping.',
  },
  {
    value: 'Camping Recipes',
    label: 'Camping Recipes',
    description: 'Food ideas and cooking methods for outdoor trips.',
  },
  {
    value: 'Destinations & Locations',
    label: 'Destinations & Locations',
    description: 'Best camping spots (mountains, beaches, forests, lakes).',
  },
  {
    value: 'Beginner Guides',
    label: 'Beginner Guides',
    description: 'Step-by-step guides for people new to camping.',
  },
];

export function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const navigate = useNavigate();

  // Handle reactions
  const handleReaction = (blogId, reactionType) => {
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === blogId) {
          return {
            ...post,
            reactions: {
              ...post.reactions,
              [reactionType]: post.reactions[reactionType] + 1,
            },
          };
        }
        return post;
      }),
    );
  };

  // Filter blogs based on search term and category
  const filteredBlogs = useMemo(() => {
    return blogPosts.filter((blog) => {
      // Filter by search term
      const matchesSearch =
        searchTerm === '' ||
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by category
      const matchesCategory =
        selectedCategory === 'all' || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, blogPosts]);

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1 className="blog-title">
          Camping <span className="title-highlight">Blog</span>
        </h1>
        <p className="blog-subtitle">
          Discover camping tips, gear reviews, and outdoor adventures
        </p>
      </div>

      <div className="blog-container">
        <div className="blog-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <Search className="search-icon" size={18} />
            <button
              className="search-button"
              onClick={() => setSearchTerm(searchTerm)}
            >
              Search
            </button>
          </div>

          <div className="controls-right">
            <select
              className="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              title="Select a category"
            >
              {categories.map((category) => (
                <option
                  key={category.value}
                  value={category.value}
                  title={category.description}
                >
                  {category.label}
                </option>
              ))}
            </select>
            <button
              className="add-blog-btn"
              onClick={() => navigate('/blog/add')}
            >
              <Plus size={20} />
              <span>Add New Blog</span>
            </button>
          </div>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="no-results">
            <p>No blogs found matching your search criteria.</p>
          </div>
        ) : (
          <div className="blog-grid">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                imageUrl={blog.imageUrl}
                category={blog.category}
                date={blog.date}
                excerpt={blog.excerpt}
                reactions={blog.reactions}
                onReact={handleReaction}
              />
            ))}
          </div>
        )}

        {selectedCategory !== 'all' && (
          <div className="category-info">
            <h3>About {selectedCategory}</h3>
            <p>
              {
                categories.find((cat) => cat.value === selectedCategory)
                  ?.description
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}