
//App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import ProductCard from './components/ProductCard';
import Navbar from './components/Navbar';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [products, setProducts] = useState([]); // State to hold product data
  const [loading, setLoading] = useState(true); // State to show loading indicator
  const navigate = useNavigate();

  // Check if the user is authenticated by looking for the accessToken in localStorage
  const checkAuthentication = () => {
    const accessToken = localStorage.getItem('accessToken');
    setIsAuthenticated(!!accessToken); // Update authentication status based on token existence
  };

  // Fetch products data
  const fetchProducts = async () => {
    try {
      const response = await axios.post('/api/v1/carProduct/allList'); // Your backend API endpoint
      setProducts(response.data.data); // Set product data from the /API response
      setLoading(false); // Set loading to false once data is loaded
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false); // Stop loading on error
    }
  };

  // Fetch products and check authentication on page load
  useEffect(() => {
    checkAuthentication();
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  const handleGetStarted = () => {
    navigate('/sign-up');  // Navigate to sign-up page when the button is clicked
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
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
          {/* Conditionally render Get Started button if not authenticated */}
          {!isAuthenticated && (
            <button
              onClick={handleGetStarted}  // Trigger navigate to sign-up
              className="bg-yellow-500 text-white px-6 py-2 rounded-full text-lg hover:bg-yellow-600"
            >
              Get Started
            </button>
          )}
        </div>
      </section>

      {/* Product List Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* If loading, show loading message */}
          {loading ? (
            <p>Loading products...</p>
          ) : (
            products.map((product, index) => (
              <ProductCard
                key={index}
                image={`data:${product.carImage[0].contentType};base64,${product.carImage[0].data}`} // Use first image
                title={product.topic}
                description={product.description}
                tags={product.tags}
                images={product.carImage.map(img => `data:${img.contentType};base64,${img.data}`)}  // Pass all images for the gallery
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default App;

