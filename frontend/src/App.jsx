
//App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import ProductCard from './components/ProductCard';
import Navbar from './components/Navbar';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const checkAuthentication = () => {
    const accessToken = localStorage.getItem('accessToken');
    setIsAuthenticated(!!accessToken);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.post('https://car-management-system-c8dh.onrender.com/api/v1/carProduct/allList');
      setProducts(response.data.data); 
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    checkAuthentication();
    fetchProducts(); 
  }, []);

  const handleGetStarted = () => {
    navigate('/sign-up');  
  };

  return (
    <div>
      <Navbar />

      <section
        className="relative bg-cover bg-center h-96"
        style={{ backgroundImage: 'url(https://via.placeholder.com/1500x600?text=Car+Management+System)' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Manage Your Cars with Ease</h1>
          <p className="text-lg sm:text-xl mb-6 text-center max-w-lg">
            Our Car Management System helps you keep track of all your vehicles, maintenance records, and more, all in one place.
          </p>
          {!isAuthenticated && (
            <button
              onClick={handleGetStarted}
              className="bg-yellow-500 text-white px-6 py-2 rounded-full text-lg hover:bg-yellow-600"
            >
              Get Started
            </button>
          )}
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            products.map((product, index) => (
              <ProductCard
                key={index}
                image={`data:${product.carImage[0].contentType};base64,${product.carImage[0].data}`} 
                title={product.topic}
                description={product.description}
                tags={product.tags}
                images={product.carImage.map(img => `data:${img.contentType};base64,${img.data}`)}  
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default App;

