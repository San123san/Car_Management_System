import React from 'react';

const YourNameProductCard = ({ image, title, description, tags, onClick, onEdit, onDelete }) => {
  // Convert tags to an array if it's a string
  const tagList = Array.isArray(tags) ? tags : tags.split(' ');

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer relative max-w-xs w-full"
      onClick={onClick} // Add onClick to the entire card
    >
      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-contain object-center"
      />

      <div className="p-4">
        {/* Product Title */}
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

        {/* Product Description */}
        <p className="text-gray-600 mt-2">{description}</p>

        {/* Product Tags */}
        <div className="mt-2 flex flex-wrap gap-2">
          {tagList.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm font-semibold bg-blue-200 text-blue-800 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Edit and Delete Buttons */}
        <div className="absolute top-2 right-2 space-x-2">
          <button
            className="bg-yellow-500 text-white p-2 rounded-md"
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening modal
              onEdit(); // Trigger edit handler
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded-md"
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening modal
              onDelete(); // Trigger delete handler
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourNameProductCard;
