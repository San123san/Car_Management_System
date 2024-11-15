// components/ProductCard.jsx
import React, { useState, useCallback } from 'react';

const ProductCard = ({ image, title, description, tags, images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Open Modal
  const openModal = (e) => {
    e.stopPropagation(); // Prevent click event from propagating to parent
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => setIsModalOpen(false);

  // Go to next image
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % images.length; // Ensure wrapping around
      return nextIndex;
    });
  }, [images.length]);

  // Go to previous image
  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => {
      const prevIndexValue = (prevIndex - 1 + images.length) % images.length; // Ensure wrapping around
      return prevIndexValue;
    });
  }, [images.length]);

  // Helper to render tags (either a single string or an array)
  const renderTags = (tags) => {
    // If tags is a string, render as a single tag
    if (typeof tags === 'string') {
      return (
        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mr-2">
          {tags}
        </span>
      );
    }

    // If tags is an array, map over it and render each tag individually
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

    return null; // Return nothing if tags is neither a string nor an array
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
      onClick={openModal} // Open modal when the card is clicked
    >
      {/* Image with Aspect Ratio Control */}
      <div className="relative w-full h-48">
        {/* Aspect ratio container */}
        <img
          src={image} // This will be the base64 image string passed as prop
          alt={title}
          className="w-full h-full object-contain" // Image will resize but maintain aspect ratio
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="mt-4">
          {/* Render tags using the helper function */}
          {renderTags(tags)}
        </div>
      </div>

      {/* Modal for viewing images */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal} // Close modal when clicking on the overlay (background)
        >
          <div
            className="bg-white p-6 rounded-lg w-11/12 max-w-3xl relative"
            onClick={(e) => e.stopPropagation()} // Prevent click on modal content from closing the modal
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full"
            >
              X
            </button>

            {/* Image Carousel */}
            <div className="flex justify-center">
              <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
                aria-label="Previous Image"
              >
                &lt;
              </button>
              {/* Ensure image is displayed properly in the modal */}
              <img
                src={images[currentImageIndex]} // This uses the full image array
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

            {/* Product Info */}
            <h2 className="text-2xl font-semibold mt-4">{title}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
            <div className="mt-4">
              {/* Render tags using the helper function */}
              {renderTags(tags)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
