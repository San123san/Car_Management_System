// components/ProductCard.jsx
import React, { useState, useCallback } from 'react';

const ProductCard = ({ image, title, description, tags, images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (e) => {
    e.stopPropagation(); 
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % images.length; 
      return nextIndex;
    });
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => {
      const prevIndexValue = (prevIndex - 1 + images.length) % images.length; 
      return prevIndexValue;
    });
  }, [images.length]);

  const renderTags = (tags) => {
    if (typeof tags === 'string') {
      return (
        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mr-2">
          {tags}
        </span>
      );
    }

    if (Array.isArray(tags)) {
      return tags.map((tag, index) => (
        <span
          key={index}
          className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mr-2"
        >
          {tag}
        </span>
      ));
    }

    return null; 
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
      onClick={openModal} 
    >
      <div className="relative w-full h-48">
        <img
          src={image} 
          alt={title}
          className="w-full h-full object-contain" 
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="mt-4">
          {renderTags(tags)}
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-11/12 max-w-3xl relative"
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full"
            >
              X
            </button>

            <div className="flex justify-center">
              <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
                aria-label="Previous Image"
              >
                &lt;
              </button>
              <img
                src={images[currentImageIndex]} 
                alt={`Product Image ${currentImageIndex + 1}`}
                className="w-full h-96 object-contain rounded-lg"
                loading="lazy"
              />
              <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
                aria-label="Next Image"
              >
                &gt;
              </button>
            </div>

            <h2 className="text-2xl font-semibold mt-4">{title}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
            <div className="mt-4">
              {renderTags(tags)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
