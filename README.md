
## Car Managememnt_System
## Website Link: 
### Overview
The Car Management Application allows users to manage cars in an intuitive way. Users can sign up, log in, and perform CRUD operations on their cars. Each car can have a title, description, up to 10 images, and associated tags like car_type, company, dealer, and more. 

---

## Key Features

- **User Authentication**:
  - Users can sign up and log in to access the system.
  - Each user can manage only their own cars.

- **Car Management**:
  - Users can add a new car with up to 10 images, a title, a description, and tags.
  - View a list of all cars created by the user.

- **Product CRUD Operations**:
  - Users can view the details of a specific car.
  - Users can update the title, description, tags.
  - Users can delete their cars.

- **Frontend**:
  - User-friendly UI for easy navigation.
  - Different pages for login, product creation, product listing, and product details.

---

### Techonology
- React.js
- Mongoose
- Express.js
- Node.js
- Tailwind CSS

---

### How to install and run
1. Clone the repo.
2. Install necessary dependecies.
3. On frontend and backend terminal run: npm run dev

---

### Additional Notes
- Ensure MongoDB is running locally or configure the connection URI in backend/config/database.js.
- Customize and enhance security measures as per your deployment environment.
- For production deployment, build the frontend using npm run build and serve it with a suitable web server.
