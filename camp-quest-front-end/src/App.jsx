// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Blog pages
import { Home } from './pages/home/Home';            // main branch home
import { Blog } from './pages/Blog';
import { AddBlog } from './pages/AddBlog';
import { EditBlog } from './pages/EditBlog';
import { BlogDetails } from './pages/BlogDetails';
import { NavBar } from './components/NavBar';

// E-commerce pages
import { Shop } from './pages/Shop/Shop';
import { Cart } from './pages/Cart/Cart';
import { Checkout } from './pages/Checkout/Checkout';
import { Payment } from './pages/Payment/Payment';
import { OrderConfirmation } from './pages/OrderConfirmation/OrderConfirmation';
import { OrderHistory } from './pages/OrderHistory/OrderHistory';
import { Rent } from './pages/Rent/Rent';
import { RentalPolicies } from './pages/RentalPolicies/RentalPolicies';
import { RentalList } from './pages/RentalList/RentalList';

// Context providers
import { RentalProvider } from './context/RentalContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

// Styles
import './index.css';
import './App.css';

function App() {
  return (
    <RentalProvider>
      <CartProvider>
        <OrderProvider>
          <Router>
            <NavBar />
            <Routes>
              {/* Common */}
              <Route path="/" element={<Home />} />

              {/* Blog routes */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/blog/add" element={<AddBlog />} />
              <Route path="/blog/edit/:id" element={<EditBlog />} />

              {/* E-commerce routes */}
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/rent" element={<Rent />} />
              <Route path="/rental-policies" element={<RentalPolicies />} />
              <Route path="/rental-list" element={<RentalList />} />
            </Routes>
          </Router>
        </OrderProvider>
      </CartProvider>
    </RentalProvider>
  );
}

export default App;
