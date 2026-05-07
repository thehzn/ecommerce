



import React, {useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Carouselcomp from './Carousel';

import Carousal from './Carousal';

// Define your backend base URL for images
const BASE_URL = "http://localhost:4000";

function Home() {
  
 
  const [search, setSearch] = useState('');

  const allproducts = useSelector((state) => state.products.items);
//  useEffect(() => {
//     async function loadProducts() {
//       try {
//         const res = await getAllProducts();
//         // 2. CHANGE: Your controller returns { success: true, products: [...] }
//         // Ensure you extract the array correctly
//         setProducts(res.products || res); 
//       } catch (error) {
//         setError("Failed to fetch products: " + error.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadProducts();
//   }, []);
  // 1. CHANGE: MongoDB uses .name and ._id (not .title and .id)
  const filteredProducts = allproducts.filter((product) =>
    product.productname.toLowerCase().includes(search.toLowerCase())
  );

  const finalProducts = search.trim() ? filteredProducts : allproducts;

 

  

  return (
    <div className="container-fluid my-4">

      <Carouselcomp />
      {/* --- ADDED SEARCH INPUT BOX HERE --- */}
      <Container className="mb-4 my-4">
        <div className="d-flex justify-content-center">
          <input
            type="text"
            className="form-control w-50 shadow-sm"
            placeholder="🔍 Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Container>


      {/* <Carousal products={allproducts.slice(0, 10)} /> */}

      <div className="row g-4 justify-content-center">
        {finalProducts.length === 0 ? (
          <h5 className="text-center w-100">No products found 😔</h5>
        ) : (
          finalProducts.map((product) => (
            // 3. CHANGE: Use product._id for the key
            <div key={product._id} className="col-12 col-md-4 col-lg-3 d-flex justify-content-around">
              <Card style={{ width: "18rem", height: "24rem" }} className="shadow-sm">
                <Card.Img
                  variant="top"
                  // 4. CHANGE: Prepend BASE_URL to the image path
                  src={`${BASE_URL}${product.productimage}`}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  {/* 5. CHANGE: Use .name instead of .title */}
                  <Card.Title>{product.productname}</Card.Title>
                  <Card.Subtitle className="text-success">₹{product.productprice}</Card.Subtitle>
                  
                  <Button
                    variant="dark"
                    className="mt-3 w-100"
                    as={Link} 
                    to={`/product/${product._id}`}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;