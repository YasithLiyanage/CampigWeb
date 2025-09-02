// pages/Home.jsx
import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { FeaturedCategories } from '../components/FeaturedCategories';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { BlogPreview } from '../components/BlogPreview';
import { CallToAction } from '../components/CallToAction';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="home-container">
      <Header />
      <main className="main-content">
        <Hero />
        <FeaturedCategories />
        <FeaturedProducts />
        <BlogPreview />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}