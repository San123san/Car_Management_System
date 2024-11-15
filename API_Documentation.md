# Postman API Documentation for Car Product and User Management

This Postman documentation provides the necessary details for using the API endpoints for managing car products (uploading images, updating, retrieving, deleting) and handling user authentication (register, login, logout, refresh token, delete).

---

## Base URL:

```http
http://<your-server-domain>/api/v1
```

---

## 1. User Authentication Endpoints

### **POST** `/register`

- **Description**: Registers a new user.
- **Request Body**:
    ``` json
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```
- **Response**:
    ``` json
    {
      "status": 200,
      "message": "User Register Successfully",
      "data": {
        "_id": "user_id",
        "email": "user@example.com"
      }
    }
    ```

### **POST** `/login`

- **Description**: Logs in a user and returns JWT access and refresh tokens.
- **Request Body**:
    ``` json
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```
- **Response**:
    ``` json
    {
      "status": 200,
      "message": "User logged In Successfully",
      "data": {
        "user": {
          "_id": "user_id",
          "email": "user@example.com"
        },
        "accessToken": "access_token_value",
        "refreshToken": "refresh_token_value"
      }
    }
    ```

### **POST** `/logout`

- **Description**: Logs out a user by invalidating the refresh token and clearing cookies.
- **Request Header**:
  - `Authorization`: Bearer `<access_token>`
- **Response**:
    ``` json
    {
      "status": 200,
      "message": "User logged Out"
    }
    ```

### **POST** `/refresh-token`

- **Description**: Refreshes the access token using the refresh token.
- **Request Body**:
    ``` json
    {
      "refreshToken": "refresh_token_value"
    }
    ```
- **Response**:
    ``` json
    {
      "status": 200,
      "message": "Access token refreshed",
      "data": {
        "accessToken": "new_access_token_value",
        "refreshToken": "new_refresh_token_value"
      }
    }
    ```

### **POST** `/userDelete`

- **Description**: Deletes the currently authenticated user and related data.
- **Request Header**:
  - `Authorization`: Bearer `<access_token>`
- **Response**:
    ``` json
    {
      "status": 200,
      "message": "User and related data deleted successfully."
    }
    ```

---

## 2. Car Product Endpoints

### **POST** `/carImageUploadWithDescriptionTopicTag`

- **Description**: Upload car images with description, topic, and tags.
- **Request Header**:
  - `Authorization`: Bearer `<access_token>`
- **Form Data**:
  - **carImage** (file): Image files (up to 10 images).
  - **description** (string): Description of the car.
  - **topic** (string): Topic for the car.
  - **tags** (string, optional): Tags related to the car.
  
- **Response**:
    ``` json
    {
      "status": 200,
      "message": "Images uploaded successfully",
      "data": {
        "_id": "car_product_id",
        "user": "user_id",
        "carImage": [
          {
            "imageId": "image_id",
            "data": "base64_encoded_image_data",
            "contentType": "image/jpeg"
          }
        ],
        "description": "Car description",
        "topic": "Car topic",
        "tags": "tag1, tag2"
      }
    }
    ```

### **POST** `/listProduct`

- **Description**: Retrieves all car products uploaded by the currently authenticated user.
- **Request Header**:
  - `Authorization`: Bearer `<access_token>`
- **Response**:
    ``` json
    {
      "status": 200,
      "message": "Images retrieved",
      "data": [
        {
          "_id": "car_product_id",
          "carImage": [
            {
              "imageId": "image_id",
              "data": "base64_encoded_image_data",
              "contentType": "image/jpeg"
            }
          ],
          "description": "Car description",
          "topic": "Car topic",
          "tags": "tag1, tag2"
        }
      ]
    }
    ```

### **POST** `/allList`

- **Description**: Retrieves all car products uploaded by all users.
- **Response**:
    ``` json
    {
      "status": 200,
      "message": "All images retrieved",
      "data": [
        {
          "user": "user_id",
          "carImage": [
            {
              "imageId": "image_id",
              "data": "base64_encoded_image_data",
              "contentType": "image/jpeg"
            }
          ],
          "description": "Car description",
          "topic": "Car topic",
          "tags": "tag1, tag2"
        }
      ]
    }
    ```

### **POST** `/updateProduct/:id`

- **Description**: Updates car product details (description, topic, tags) and images.
- **Request Parameters**:
  - `id`: ID of the car product to be updated.
- **Request Header**:
  - `Authorization`: Bearer `<access_token>`
- **Form Data**:
  - **description** (string, optional): Updated description.
  - **topic** (string, optional): Updated topic.
  - **tags** (string, optional): Updated tags.
  - **carImage** (file, optional): New images to update.
  - **imagesToUpdate** (array of objects, optional): List of image IDs to update and corresponding new images.
  
- **Response**:
    ``` json
    {
      "status": 200,
      "message": "Car product updated successfully",
      "data": {
        "_id": "car_product_id",
        "user": "user_id",
        "carImage": [
          {
            "imageId": "image_id",
            "data": "base64_encoded_image_data",
            "contentType": "image/jpeg"
          }
        ],
        "description": "Updated description",
        "topic": "Updated topic",
        "tags": "updated, tags"
      }
    }
    ```

### **POST** `/carDelete/:id`

- **Description**: Deletes a car product by ID.
- **Request Parameters**:
  - `id`: ID of the car product to delete.
- **Request Header**:
  - `Authorization`: Bearer `<access_token>`
- **Response**:
    ``` json
    {
      "status": 200,
      "message": "Delete successfully"
    }
    ```

---

## Authentication Middleware (verifyJWT)

- All protected routes (e.g., car product upload, user-related data) require the `Authorization` header with a valid JWT token:
  - **Authorization**: Bearer `<access_token>`

---

## Error Response Example

``` json
{
  "status": 400,
  "message": "At least one image is required"
}
```

---

## Notes

- **Car Image File Limit**: You can upload up to 10 images at once.
- **JWT Expiry**: Access tokens have an expiration time, typically handled by the `/refresh-token` endpoint for getting a new access token using a refresh token.

---

This documentation provides a clear overview of how to interact with the API endpoints for managing user accounts and car products. You can import these requests into your Postman collection to test the API endpoints directly.
