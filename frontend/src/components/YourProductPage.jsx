
// // components/YourProductPage.jsx

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import YourNameProductCard from './YourNameProductCard'; 
// import Navbar from './Navbar'; 
// import ProductModal from './ProductModal'; 

// const YourProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     images: [], // Base64 previews for images
//     files: [],   // Actual file objects
//     title: '',
//     description: '',
//     tags: '', // Tags as a single string
//     topic: '' // Add topic to the newProduct state
//   });
//   const [selectedProduct, setSelectedProduct] = useState(null); // For modal

//   // Fetch car product data when the component mounts
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.post('/api/v1/carProduct/listProduct'); // Get car products from backend
//         const carInformation = response.data.data;

//         // Process images from base64
//         const processedProducts = carInformation.map((product) => ({
//           ...product,
//           images: product.carImage.map((image) => `data:${image.contentType};base64,${image.data}`),
//           tags: product.tags.split(' ') // Split the tags string into an array
//         }));

//         setProducts(processedProducts); // Set fetched products to state
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Handle uploading images
//   const handleUploadChange = (e) => {
//     const { files } = e.target;
//     if (files && files.length > 0) {
//       // Select only up to 10 images
//       const selectedImages = Array.from(files).slice(0, 10 - newProduct.images.length);
//       const previews = selectedImages.map((file) => {
//         const reader = new FileReader();
//         return new Promise((resolve) => {
//           reader.onloadend = () => resolve(reader.result);  // Convert to base64 for preview
//           reader.readAsDataURL(file);
//         });
//       });

//       // Add selected images to the preview list and actual file list
//       Promise.all(previews).then((newImages) => {
//         setNewProduct((prevState) => ({
//           ...prevState,
//           images: [...prevState.images, ...newImages],
//           files: [...prevState.files, ...selectedImages], // Actual files for upload
//         }));
//       });
//     }
//   };

//   const handleProductUpload = async (e) => {
//     e.preventDefault();
    
//     const formData = new FormData();
    
//     // Append text fields (description, topic, tags)
//     formData.append('description', newProduct.description);
//     formData.append('topic', newProduct.topic);
//     formData.append('tags', newProduct.tags);

//     // Append images (files)
//     if (newProduct.files && newProduct.files.length > 0) {
//       newProduct.files.forEach((imageFile) => {
//         formData.append('carImage', imageFile); // Append each image file
//       });
//     } else {
//       console.error('No image files selected');
//       return;  // Prevent submission if no images
//     }

//     // Log the FormData to inspect it before sending
//     for (let pair of formData.entries()) {
//       console.log(pair[0]+ ', ' + pair[1]);
//     }

//     try {
//       const response = await axios.post('/api/v1/carProduct/carImageUploadWithDescriptionTopicTag', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data', // Correct header for file upload
//         },
//       });
//       console.log('Upload Successful:', response.data);
//       window.location.reload();
//     } catch (error) {
//       console.error('Error uploading product:', error.response || error.message);
//       if (error.response) {
//         console.error('Error details:', error.response.data);
//       }
//     }
//   };

//   // Handle opening the product modal
//   const handleOpenModal = (product) => {
//     setSelectedProduct(product);
//   };

//   // Handle closing the product modal
//   const handleCloseModal = () => {
//     setSelectedProduct(null);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-6xl mx-auto py-8">
//         <h1 className="text-3xl font-bold mb-6">Your Products</h1>

//         {/* Upload Product Form */}
//         <div className="mb-8">
//           <h2 className="text-2xl mb-4">Upload New Product</h2>
//           <form onSubmit={handleProductUpload}>
//             <div className="mb-4">
//               <label htmlFor="images" className="block text-sm font-semibold">Upload Images (up to 10)</label>
//               <div className="flex items-center space-x-4">
//                 {newProduct.images.length < 10 && (
//                   <button
//                     type="button"
//                     className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//                     onClick={() => document.getElementById('imageInput').click()}
//                   >
//                     Add Image
//                   </button>
//                 )}
//                 <input
//                   type="file"
//                   id="imageInput"
//                   className="hidden"
//                   accept="image/*"
//                   multiple
//                   onChange={handleUploadChange}
//                   disabled={newProduct.images.length >= 10}
//                 />
//               </div>
//             </div>

//             {/* Image Previews */}
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
//               {newProduct.images.map((image, index) => (
//                 <div key={index} className="relative">
//                   <img
//                     src={image}
//                     alt={`preview-${index}`}
//                     className="w-full h-auto max-h-60 object-contain rounded-md"
//                   />
//                   <button
//                     type="button"
//                     className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                     onClick={() => {
//                       const updatedImages = newProduct.images.filter((_, idx) => idx !== index);
//                       setNewProduct((prevState) => ({
//                         ...prevState,
//                         images: updatedImages
//                       }));
//                     }}
//                   >
//                     x
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* Product Details */}
//             <div className="mb-4">
//               <label htmlFor="title" className="block text-sm font-semibold">Title</label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={newProduct.title}
//                 onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="description" className="block text-sm font-semibold">Description</label>
//               <textarea
//                 id="description"
//                 name="description"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={newProduct.description}
//                 onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="tags" className="block text-sm font-semibold">Tags</label>
//               <input
//                 type="text"
//                 id="tags"
//                 name="tags"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={newProduct.tags}
//                 onChange={(e) => setNewProduct({ ...newProduct, tags: e.target.value })}
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="topic" className="block text-sm font-semibold">Topic</label>
//               <input
//                 type="text"
//                 id="topic"
//                 name="topic"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={newProduct.topic}
//                 onChange={(e) => setNewProduct({ ...newProduct, topic: e.target.value })}
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//               disabled={
//                 newProduct.images.length === 0 ||
//                 newProduct.files.length === 0 || // Ensure files are selected
//                 !newProduct.title ||
//                 !newProduct.description ||
//                 !newProduct.tags ||
//                 !newProduct.topic
//               }
//             >
//               Upload Product
//             </button>
//           </form>
//         </div>

//         {/* Display Product Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {products.map((product) => (
//             <YourNameProductCard
//               key={product._id}
//               image={product.images[0]} // Show first image
//               title={product.topic}
//               description={product.description}
//               tags={product.tags} // Now it's an array
//               onClick={() => handleOpenModal(product)} // Open modal on card click
//             />
//           ))}
//         </div>

//         {/* Product Modal */}
//         <ProductModal product={selectedProduct} onClose={handleCloseModal} />
//       </div>
//     </div>
//   );
// };

// export default YourProductPage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YourNameProductCard from './YourNameProductCard';
import Navbar from './Navbar';
import ProductModal from './ProductModal'; // Import the modal

const YourProductPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    images: [],
    files: [],
    description: '',
    tags: '',
    topic: '',
  });
  const [selectedProduct, setSelectedProduct] = useState(null); // For modal
  const [isEditing, setIsEditing] = useState(false); // Flag to check if editing
  const [editingProductId, setEditingProductId] = useState(null); // To store the product ID being edited

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post('/api/v1/carProduct/listProduct');
        const carInformation = response.data.data;

        const processedProducts = carInformation.map((product) => ({
          ...product,
          images: product.carImage.map((image) => `data:${image.contentType};base64,${image.data}`),
          tags: product.tags.split(' '), // Split tags string into an array of tags
        }));

        setProducts(processedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle changes to file inputs (image upload)
  const handleUploadChange = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const selectedImages = Array.from(files).slice(0, 10 - newProduct.images.length);
      const previews = selectedImages.map((file) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(previews).then((newImages) => {
        setNewProduct((prevState) => ({
          ...prevState,
          images: [...prevState.images, ...newImages],
          files: [...prevState.files, ...selectedImages],
        }));
      });
    }
  };

  // Handle the upload form submission for a new product
  const handleProductUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('description', newProduct.description);
    formData.append('topic', newProduct.topic);
    formData.append('tags', newProduct.tags);

    if (newProduct.files && newProduct.files.length > 0) {
      newProduct.files.forEach((imageFile) => {
        formData.append('carImage', imageFile);
      });
    } else {
      console.error('No image files selected');
      return;
    }

    try {
      const response = await axios.post('/api/v1/carProduct/carImageUploadWithDescriptionTopicTag', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product uploaded:', response.data);
      window.location.reload(); // Reload the page to show the new product
    } catch (error) {
      console.error('Error uploading product:', error.response || error.message);
      alert('There was an error uploading the product. Please try again.');
    }
  };

  // Handle the edit action and open the modal
  const handleEdit = (product) => {
    setNewProduct({
      images: product.images || [],
      files: [], // Don't reset files, we'll handle this separately
      description: product.description || '',
      tags: product.tags.join(' ') || '',
      topic: product.topic || '',
    });
    setEditingProductId(product._id); // Set the editing product ID
    setIsEditing(true); // Set editing mode
  };

  // Close the edit modal
  const handleCloseModal = () => {
    setIsEditing(false);
    setSelectedProduct(null);
  };

  // Handle product update
  const handleProductUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('description', newProduct.description);
    formData.append('topic', newProduct.topic);
    formData.append('tags', newProduct.tags);

    if (newProduct.files && newProduct.files.length > 0) {
      newProduct.files.forEach((imageFile) => {
        formData.append('carImage', imageFile);
      });
    }

    try {
      const response = await axios.post(`/api/v1/carProduct/updateProduct/${editingProductId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product updated:', response.data);
      window.location.reload(); // Reload the page after updating
    } catch (error) {
      console.error('Error updating product:', error.response || error.message);
      alert('There was an error updating the product. Please try again.');
    }
  };

  // Handle deleting a product and reloading the page
  const handleDelete = async (productId) => {
    try {
      // Send delete request to the backend
      const response = await axios.post(`/api/v1/carProduct/carDelete/${productId}`);
      
      // If deletion is successful, reload the page
      console.log('Product deleted:', response.data);
      window.location.reload(); // Reload the page to reflect the changes

    } catch (error) {
      console.error('Error deleting product:', error.response || error.message);
      alert('There was an error deleting the product. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Your Products</h1>

        {/* Upload New Product Form */}
        <div className="mb-8">
          <h2 className="text-2xl mb-4">Upload New Product</h2>
          <form onSubmit={handleProductUpload}>
            {/* Image Upload */}
            <div className="mb-4">
              <label htmlFor="images" className="block text-sm font-semibold">Upload Images (up to 10)</label>
              <div className="flex items-center space-x-4">
                {newProduct.images.length < 10 && (
                  <button
                    type="button"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    onClick={() => document.getElementById('imageInput').click()}
                  >
                    Add Image
                  </button>
                )}
                <input
                  type="file"
                  id="imageInput"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleUploadChange}
                  disabled={newProduct.images.length >= 10}
                />
              </div>
              {/* Display selected image previews */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                {newProduct.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image} alt={`preview-${index}`} className="w-24 h-24 object-cover rounded-md" />
                    <button
                      type="button"
                      className="absolute top-0 right-0 text-white bg-red-500 rounded-full p-1"
                      onClick={() => {
                        const updatedImages = [...newProduct.images];
                        const updatedFiles = [...newProduct.files];
                        updatedImages.splice(index, 1);
                        updatedFiles.splice(index, 1);
                        setNewProduct({ ...newProduct, images: updatedImages, files: updatedFiles });
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-semibold">Description</label>
              <textarea
                id="description"
                name="description"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newProduct.description || ''}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="tags" className="block text-sm font-semibold">Tags</label>
              <input
                type="text"
                id="tags"
                name="tags"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newProduct.tags || ''}
                onChange={(e) => setNewProduct({ ...newProduct, tags: e.target.value })}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="topic" className="block text-sm font-semibold">Topic</label>
              <input
                type="text"
                id="topic"
                name="topic"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newProduct.topic || ''}
                onChange={(e) => setNewProduct({ ...newProduct, topic: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              disabled={!newProduct.description || !newProduct.tags || !newProduct.topic || !newProduct.files.length}
            >
              Upload Product
            </button>
          </form>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <YourNameProductCard
              key={product._id}
              image={product.images[0]}
              title={product.topic}
              description={product.description}
              tags={product.tags}
              onClick={() => setSelectedProduct(product)} // Open details modal
              onEdit={() => handleEdit(product)} // Open edit modal
              onDelete={() => handleDelete(product._id)} // Delete product and update UI
            />
          ))}
        </div>

        {/* Product Modal */}
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}

        {/* Edit Product Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
              <form onSubmit={handleProductUpdate}>
                {/* Product Details */}
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-semibold">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newProduct.description || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="tags" className="block text-sm font-semibold">Tags</label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newProduct.tags || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, tags: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="topic" className="block text-sm font-semibold">Topic</label>
                  <input
                    type="text"
                    id="topic"
                    name="topic"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newProduct.topic || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, topic: e.target.value })}
                    required
                  />
                </div>

                {/* Image Update */}
                <div className="mb-4">
                  <label htmlFor="images" className="block text-sm font-semibold">Update Images (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleUploadChange}
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourProductPage;
