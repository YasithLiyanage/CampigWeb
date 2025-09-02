import React from 'react';
import {
  Edit2,
  Trash2,
  ThumbsUp,
  Heart,
  Smile,
  Star,
} from 'lucide-react';
import './BlogCard.css';

export function BlogCard({
  id,
  title,
  excerpt,
  imageUrl,
  category,
  date,
  reactions = {
    likes: 0,
    loves: 0,
    smiles: 0,
    stars: 0,
  },
  onReact,
}) {
  const handleReaction = (reactionType) => {
    if (onReact) {
      onReact(id, reactionType);
    }
  };

  return (
    <div className="blog-card">
      <div className="blog-card-image">
        <img
          src={imageUrl}
          alt={title}
        />
      </div>
      <div className="blog-card-content">
        <div className="blog-card-header">
          <span className="blog-card-category">
            {category.toUpperCase()}
          </span>
          <span className="blog-card-date">{date}</span>
        </div>
        <h3 className="blog-card-title">{title}</h3>
        <p className="blog-card-excerpt">{excerpt}</p>
        
        {/* Reactions section */}
        <div className="blog-card-reactions">
          <div className="reactions-buttons">
            <button
              onClick={() => handleReaction('likes')}
              className="reaction-btn reaction-likes"
            >
              <ThumbsUp size={18} />
              <span>{reactions.likes}</span>
            </button>
            <button
              onClick={() => handleReaction('loves')}
              className="reaction-btn reaction-loves"
            >
              <Heart size={18} />
              <span>{reactions.loves}</span>
            </button>
            <button
              onClick={() => handleReaction('smiles')}
              className="reaction-btn reaction-smiles"
            >
              <Smile size={18} />
              <span>{reactions.smiles}</span>
            </button>
            <button
              onClick={() => handleReaction('stars')}
              className="reaction-btn reaction-stars"
            >
              <Star size={18} />
              <span>{reactions.stars}</span>
            </button>
          </div>
        </div>
        
        <div className="blog-card-actions">
          <button className="action-btn edit-btn">
            <Edit2 size={18} />
          </button>
          <button className="action-btn delete-btn">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}