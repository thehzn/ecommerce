// export async function getAllProducts() {
//   const res = await fetch("https://dummyjson.com/products");
//   const data = await res.json();
//   return data.products;
// }

// export async function getProductById(id) {
//   const res = await fetch(`https://dummyjson.com/products/${id}`);
//   const data = await res.json();
//   return data;
// }
// Example utils/api.js
import axios from 'axios';

const API_URL = "http://localhost:4000/api/v1/product/"; // Removed trailing slash

export const getAllProducts = async () => {
    const response = await axios.get(`${API_URL}allproducts`); // Use the constant
    return response.data; 
};

