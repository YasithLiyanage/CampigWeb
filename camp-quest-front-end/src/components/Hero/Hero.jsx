// components/Hero.jsx
import React from 'react';
import './Hero.css';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          alt="Night camping under stars"
          className="hero-bg-img"
        />
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-badge">
              Premium Camping Experience
            </span>
            <h1 className="hero-title">
              Your Adventure <span className="hero-title-accent">Starts</span> With
              Quality Gear
            </h1>
            <p className="hero-description">
              Rent or buy premium camping equipment for your next outdoor
              adventure. We've got everything you need.
            </p>
            <div className="hero-actions">
              <button className="btn-primary">
                Rent Equipment
              </button>
              <button className="btn-secondary">
                Shop Collection
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-frame">
              <img
                src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                alt="Camping gear and equipment"
                className="hero-product-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}