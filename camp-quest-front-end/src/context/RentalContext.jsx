// context/RentalContext.jsx
/* eslint-disable react-refresh/only-export-components */

import React, { useState, createContext, useContext} from 'react';

const RentalContext = createContext(undefined);

export function RentalProvider({ children }) {
  const [rentalItems, setRentalItems] = useState([
    {
      id: '1',
      name: '4-Person Camping Tent',
      price: 12.99,
      image: 'https://uploadthingy.s3.us-west-1.amazonaws.com/bSemA9iKNYU9ATtfUAPE57/WhatsApp_Image_2025-09-02_at_12.41.03_31cb9f28.jpg',
      quantity: 1,
      reviews: 124,
      rating: 4,
    },
    {
      id: '2',
      name: 'Sleeping Bag',
      price: 8.99,
      image: 'https://uploadthingy.s3.us-west-1.amazonaws.com/qWcfhKujHisDCG5dJX3zpA/image.png',
      quantity: 1,
      reviews: 215,
      rating: 4,
    },
  ]);
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const addRentalItem = (item) => {
    setRentalItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: i.quantity + 1,
              }
            : i,
        );
      }
      return [...prev, item];
    });
  };

  const removeRentalItem = (id) => {
    setRentalItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setRentalItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    );
  };

  const setDates = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const clearRentals = () => {
    setRentalItems([]);
    setStartDate(null);
    setEndDate(null);
  };

  const getTotalPrice = () => {
    let total = 0;
    let days = 1;
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    }
    rentalItems.forEach((item) => {
      total += item.price * item.quantity * days;
    });
    return total;
  };

  return (
    <RentalContext.Provider
      value={{
        rentalItems,
        startDate,
        endDate,
        addRentalItem,
        removeRentalItem,
        updateQuantity,
        setDates,
        clearRentals,
        getTotalPrice,
      }}
    >
      {children}
    </RentalContext.Provider>
  );
}

export function useRental() {
  const context = useContext(RentalContext);
  if (context === undefined) {
    throw new Error('useRental must be used within a RentalProvider');
  }
  return context;
}