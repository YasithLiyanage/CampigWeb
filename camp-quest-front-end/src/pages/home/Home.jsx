// pages/Home.jsx
import React from 'react';
import { Header } from '../../components/Header/Header';
import { Hero } from '../../components/Hero/Hero';
import { FeaturedCategories } from '../../components/FeaturedCategories/FeaturedCategories';
import { FeaturedProducts } from '../../components/FeaturedProducts/FeaturedProducts';
import { BlogPreview } from '../../components/BlogPreview/BlogPreview';
import { CallToAction } from '../../components/CallToAction/CallToAction';
import { Footer } from '../../components/Footer/Footer';
import './home.css';

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