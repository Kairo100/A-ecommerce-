import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/api';
import '../css/categories.css'

// Function to fetch categories data and set state
export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    getCategories();
  }, []);

  // JSX to render categories list
  return (
   <div className="category">
     
     <div className="container">
     
      <div className="categories-list">
        {categories.map((category) => (
          <a key={category.id} href={`/category/${category.id}`} className="category-card">
          <div className="catImage">
          <img src={`http://127.0.0.1:8000${category.image}`} alt={category.name} />
          </div>
            <p>{category.name}</p>
            
          </a>
        ))}
      </div>
    </div>
    </div>
  );
}
