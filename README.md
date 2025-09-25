# Food Delivery App (MERN Stack)
This is a full-stack food delivery application built using the MERN stack (MongoDB, Express, React, Node.js). The app allows users to browse food items, add to cart, place an order, and make payments through Stripe's demo payment gateway. An admin panel provides functionality to manage orders and add new food items.
## Features
### User Functionalities:
- **Sign Up / Login**: Users can create an account or log in to their existing account.
- **Home Page**: Displays a variety of food items available for ordering.
- **Cart**: Users can add food items to the cart and view them on the cart page.
- **Place Order**: Users enter their name, address, and phone number to place an order.
- **Stripe Payment Integration**: A demo payment page using Stripe is provided for order confirmation.
### Admin Functionalities:
- **View Orders**: Admin can view all the orders placed by users.
- **Update Order Status**: Admin can change the status of an order (e.g., Food Processing, Out for Delivery, Delivered).
- **Add Food Items**: Admin can add new food items to the menu through the admin panel.
- **View food items**: Admin can vew all the food items available in the database.
## Tech Stack
- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Payment Gateway**: Stripe (Demo)
## Installation and Setup
### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine
- [MongoDB](https://www.mongodb.com/) installed and running locally or a cloud MongoDB Atlas account
- Stripe account for payment integration
### Steps
1. **Clone the repository**:
```bash
git clone https://github.com/Naveendevaraju5265/Tomato-Food-delivery.git
```
Navigate to the project directory:
```bash
cd Food-delivery
```
2. **Install dependencies for both frontend, backend and admin**:
Backend:
```bash
cd backend
npm install
```
Frontend:
```bash 
cd frontend
npm install
```
Admin:
```bash
cd admin
npm install
```
3. **Set up environment variables: Create a .env file in the backend directory and add the following**:

```bash
JWT_SECRET=your-secret-word-any
STRIPE_SECRET_KEY=your-stripe-secret-key
```

4. **Run the application**:
Backend:
```bash
cd backend
npm run server 
```
Frontend:
```bash 
cd frontend
npm run dev
```
Admin:
```bash
cd admin
npm run dev
```
5. **Open localhost port running in your browser to use the app**. <br>
6. **Future Enhancements**:<br>
    Integration with real-time delivery tracking.<br>
    Email or SMS notifications for order updates.<br>
    User profile management and order history.<br>
7. **Screenshots**: <br>
Home Page-1: <br>
<img width="948" alt="Screenshot 2025-01-12 125829" src="https://github.com/user-attachments/assets/4b74ccb4-35d4-4926-93b5-456607008da4" /> <br>
Home Page-2: <br>
<img width="948" alt="Screenshot 2025-01-12 125808" src="https://github.com/user-attachments/assets/017ef775-6ac3-4eb0-b690-5c29d8dcc698" /> <br>
Login Page: <br>
<img width="947" alt="Screenshot 2025-01-12 220132" src="https://github.com/user-attachments/assets/b0085a9f-2775-419e-bc4d-63c1ae2dcf5c" /> <br>
Cart: <br>
<img width="947" alt="Screenshot 2025-01-12 125926" src="https://github.com/user-attachments/assets/5b93097a-3385-4f58-bf61-66df10578102" /> <br>
Payment Gateway: <br>
<img width="945" alt="Screenshot 2025-01-12 150908" src="https://github.com/user-attachments/assets/6558d427-690e-4b71-b2d5-df427ffddf3b" /> <br>
Add new Food items(admin): <br>
<img width="947" alt="Screenshot 2025-01-12 130115" src="https://github.com/user-attachments/assets/c3510766-89bc-48cc-b5cd-f6854f8f4253" /> <br>
List of all Food items(admin): <br>
<img width="946" alt="Screenshot 2025-01-12 130135" src="https://github.com/user-attachments/assets/40de83c3-dc53-4ae0-80cd-3df5f89e5aec" /> <br>
List of all Orders(admin): <br>
<img width="948" alt="Screenshot 2025-01-12 130150" src="https://github.com/user-attachments/assets/acdde55c-9214-4f2a-8ad9-d6cc5820ec39" /> <br>
