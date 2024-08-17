# MerchMaze

![Design preview for Ecommerce Site](./src/design/ecommerce%20site.png)

## Links
- [Live URL](https://merchmaze5867.netlify.app/)
- [Github URL](https://github.com/sukanyagurav/Ecommerce-site)

## Overview

Built an e-commerce shopping cart application using React.js. The application includes a product listing page that showcases various products with details and an "Add to Cart" feature. It also features a dedicated cart page where users can manage their items, adjust quantities, remove products, and view total price calculations, including any potential discounts.

## Built with

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)  ![Sonner](https://img.shields.io/badge/sonner-%2320232a.svg?style=for-the-badge&logo=Sonner&logoColor=white)  ![Zustand](https://img.shields.io/badge/zustand-%F8B533.svg?style=for-the-badge&logo=Sonner&logoColor=white) ![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)

## Detailed Features:
- Responsive design to adjust for different screen sizes.
- Product Listing Page:
  - Each product card includes:
        - Product image
        - Product name
        - Product price (formatted for currency)
        - "Add to Cart" button
  - Add to Cart Functionality:
        - Clicking the "Add to Cart" button on a product should:
        - Add the chosen product to a user's virtual shopping cart.
        - Update the cart icon or a dedicated counter to reflect the number of added items.
        - Provide visual feedback (e.g., animation) confirming the item's addition.
- Cart Page:
    - Display a dedicated cart page where users can manage their selected products.
    - The cart page includes:
        - A list of all added products, displaying:
            - Product image
            - Product name
            - Product price
            - Quantity selector (up/down buttons or input field) to adjust the amount of each item.
            - "Remove Item" button to delete a specific product from the cart.
        - Cart summary section:
            - Subtotal: Calculate the total cost of all items in the cart based on their quantity and price.
            - Discounts (optional): Implement the ability to apply discounts on the total price for each product. This could involve:
                - Fixed discounts (e.g., "₹10 off")
                - Percentage discounts (e.g., "10% off")
            - Total price (including discounts): Display the final price the user needs to pay.
            - Checkout button: This will provide a message indicating successful cart addition.



## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

