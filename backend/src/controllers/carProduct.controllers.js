import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { users } from "../models/users.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { carProduct } from "../models/carProduct.models.js"
import fs from 'fs';

// uploading an image with description and topic and tags
const carImageUploadWithDescriptionTopicTags = asyncHandler(async (req, res) => {
    // Extract data from the request body and files
    console.log("Request Body:", req.body); // Log request body
    console.log("Uploaded Files:", req.files); 
    const { description, topic, tags } = req.body;
    const { carImage } = req.files;

    try {
        // Check if at least one image is provided
        if (!carImage || carImage.length === 0) {
            throw new ApiError(400, "At least one image is required");
        }

        // Validate the number of images
        if (carImage.length > 10) {
            throw new ApiError(400, "You can upload up to 10 images only");
        }

        // Fetch user details from users model based on user ID
        const user = await users.findById(req.user._id);

        // Create an array to store image data for saving
        const imageDataArray = [];

        for (const file of carImage) {
            // Read the image file and convert it to a Buffer
            const imageBuffer = fs.readFileSync(file.path);

            // Create an object for each uploaded image
            imageDataArray.push({
                data: imageBuffer,
                contentType: file.mimetype
            });

            // Remove the temporary image file
            fs.unlinkSync(file.path);
        }

        // Create a new upload entry in the database
        const newUpload = new carProduct({
            user: req.user._id,
            carImage: imageDataArray,
            description: description,
            topic: topic,
            tags: tags || ''  // Store tags if provided
        });

        // Save the upload instance to the database
        await newUpload.save();

        // Respond with success message
        res.status(201).json(new ApiResponse(200, newUpload, "Images uploaded successfully"));
    } catch (error) {
        // In case of any error, handle it and respond with an error message
        throw new ApiError(500, error.message || "Failed to upload images");
    }
});

//user all upload information related to car
const userCarRelatedInformation = asyncHandler(async (req, res) => {
    try {

        //Fetch images belonging to the logged-in user
        const carUploadInformations = await carProduct.find({ user: req.user._id });

        //If no upload found, return a 404 error
        if (!carUploadInformations || carUploadInformations.length === 0) {
            throw new ApiError(404, "No images found for this user");
        }

        //Contruct response with image details including upload date and time
        const carInformation = carUploadInformations.map(carUploadInformation => ({
            _id: carUploadInformation._id,
            // carImage: {
            //     data: carUploadInformation.carImage.data.toString('base64'),  //Convert Buffer to base64 string
            //     // data: upload.carImage.data,
            //     contentType: upload.carImage.contentType
            // },
            carImage: carUploadInformation.carImage.map(image => ({
                imageId: image._id,
                data: image.data.toString('base64'),  // Convert each image Buffer to base64 string
                contentType: image.contentType
            })),
            description: carUploadInformation.description,
            topic: carUploadInformation.topic,
            tags: carUploadInformation.tags
        }));

        const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    }


        res.status(200)
        .cookie("accessToken", token, {
               httpOnly: true,
               secure: true, // Ensure this is set to true on production
               sameSite: 'None', // SameSite=None allows cookies to be sent cross-domain
          })
        .json(new ApiResponse(200, carInformation, "Images retireve")
        )
    } catch (error) {
        throw new ApiError(500, error.message || "Failed to retrieve images");
    }
});

// List of all user product
const allListProduct = asyncHandler(async (req, res) => {
    try {
        //Fetch all images from the database
        const allUser = await carProduct.find();

        //If no uploads found, return a 404 error
        if (!allUser || allUser.length === 0) {
            throw new ApiError(404, "No images found");
        }

        //Construct response
        const allImages = allUser.map(all_User => ({
            user: all_User.user,
            carImage: all_User.carImage.map(image => ({
                imageId: image._id,
                data: image.data.toString('base64'),  // Convert each image Buffer to base64 string
                contentType: image.contentType
            })),
            description: all_User.description,
            topic: all_User.topic,
            tags: all_User.tags
        }));

        res.status(200).json(new ApiResponse(200, allImages, "All images retrieved"));
    } catch (error) {
        throw new ApiError(500, error.message || "Failed to retrieve images");
    }
});

//User Car Update
const updateCarProduct = asyncHandler(async (req, res) => {
    const { id } = req.params; // Product ID
    const { description, topic, tags, imagesToUpdate } = req.body; // Form data
    const { carImage } = req.files; // Files uploaded via Multer

    try {
        // Fetch the car product using its ID
        let usersCarUpdate = await carProduct.findById(id);
        if (!usersCarUpdate) {
            throw new ApiError(404, "Car product not found");
        }

        // Update the other fields (description, topic, tags)
        if (description) usersCarUpdate.description = description;
        if (topic) usersCarUpdate.topic = topic;
        if (tags) usersCarUpdate.tags = tags;

        // Check if carImage and imagesToUpdate are provided in the request
        if (carImage && imagesToUpdate && imagesToUpdate.length > 0) {
            // Loop through each image update request
            for (let i = 0; i < imagesToUpdate.length; i++) {
                const { imageId } = imagesToUpdate[i]; // Image ID to update
                const newImage = carImage[i]; // Corresponding new image file

                // Find the image by its imageId
                const imageIndex = usersCarUpdate.carImage.findIndex(
                    (image) => image._id.toString() === imageId
                );

                // If the image is found, replace it
                if (imageIndex !== -1 && newImage) {
                    // Read the new image file and convert it to a buffer
                    const imageBuffer = fs.readFileSync(newImage.path);

                    // Replace the old image with the new one (preserve _id)
                    usersCarUpdate.carImage[imageIndex] = {
                        data: imageBuffer,         // Update the image data
                        contentType: newImage.mimetype, // Update the content type
                        _id: usersCarUpdate.carImage[imageIndex]._id, // Keep the original _id
                    };

                    // Remove the temporary file after it's processed
                    fs.unlinkSync(newImage.path);
                } else {
                    // If no image with the given ID was found, throw an error
                    throw new ApiError(400, `Image with ID ${imageId} not found`);
                }
            }
        }

        // Save the updated product to the database
        await usersCarUpdate.save();

        // Send a successful response
        res.status(200).json(new ApiResponse(200, usersCarUpdate, "Car product updated successfully"));
    } catch (error) {
        // Handle any errors that occur during the process
        throw new ApiError(500, error.message || "Failed to update car product");
    }
});


//User Car Delete
const carDelete = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const upload = await carProduct.findOneAndDelete({ _id: id });

        res.status(200).json(new ApiResponse(200, null, "Delete successfully"))
    } catch (error) {
        throw new ApiError(500, error.message || "Failed to delete information")
    }
})

export {
    carImageUploadWithDescriptionTopicTags,
    userCarRelatedInformation,
    allListProduct,
    updateCarProduct,
    carDelete
}
