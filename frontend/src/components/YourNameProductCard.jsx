import React from 'react';

const YourNameProductCard = ({ image, title, description, tags, onClick, onEdit, onDelete }) => {
  const tagList = Array.isArray(tags) ? tags : tags.split(' ');

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer relative max-w-xs w-full"
      onClick={onClick} 
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-contain object-center"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

        <p className="text-gray-600 mt-2">{description}</p>

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

        <div className="absolute top-2 right-2 space-x-2">
          <button
            className="bg-yellow-500 text-white p-2 rounded-md"
            onClick={(e) => {
              e.stopPropagation(); 
              onEdit();
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded-md"
            onClick={(e) => {
              e.stopPropagation(); 
              onDelete(); 
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
