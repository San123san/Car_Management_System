import React, { useState } from 'react';

const ProductModal = ({ product, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Return nothing if no product is provided
  if (!product) return null;

  // Ensure 'tags' is always an array
  const tags = Array.isArray(product.tags) ? product.tags : product.tags ? product.tags.split(' ') : [];

  // Handle image navigation
  const goToNextImage = () => {
    if (currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-4/5 max-w-4xl h-3/4 flex flex-col sm:flex-row">
        {/* Modal Content */}
        <div className="relative w-full sm:w-1/2 h-full flex justify-center items-center">
          <img
            src={product.images[currentImageIndex]}
            alt={product.title}
            className="w-full h-full object-contain rounded-md"
          />

          {/* Navigation Arrows */}
          <button
            onClick={goToPreviousImage}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          >
            &lt;
          </button>
          <button
            onClick={goToNextImage}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          >
            &gt;
          </button>
        </div>

        <div className="sm:w-1/2 h-full overflow-y-auto p-4">
          <h2 className="text-2xl font-semibold mb-4">{product.title}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>

          {/* Product Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.length > 0 ? (
              tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-semibold bg-blue-200 text-blue-800 rounded-full"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No tags available</span>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition mt-4"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
