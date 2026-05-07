

const BASE_URL = "http://localhost:4000";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addtocart } from "../redux/cartSlice";
import { useSelector } from "react-redux";
import useAxios from "../hooks/axios";


function Products() {
  const { id } = useParams();
  const axios =useAxios();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
const dispatch = useDispatch();
const cartItems = useSelector((state) => state.cart.items);

const isItemInCart = product ?cartItems.some((item) => item._id === product._id):false;
  useEffect(() => {
    async function loadProduct() {
      try {
        const {data} = await axios.get(`product/${id}`);
        setProduct(data.product);

      }
      catch (error) {
        setError("Failed to fetch product: " + error.message);
      }
      finally {
        setLoading(false); 

        
      }
    }
    if (id) {
    loadProduct();
  }
  }, [id]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!product) return <p className="text-center">Product not found</p>;

 return (
    <div className="container mt-5">
      <Card className="w-75 mx-auto shadow p-3">
        <div className="d-flex flex-column flex-md-row">
          <Card.Img
            variant="top"
            // CHANGE: Use product.image and BASE_URL
            src={`${BASE_URL}${product.productimage}`}
            style={{ height: "300px", width: "300px", objectFit: "contain" }}
          />
          <Card.Body className="text-start ms-md-4">
            {/* CHANGE: product.name instead of product.title */}
            <Card.Title className="fs-2">{product.productname}</Card.Title>
            <Card.Text>{product.productdescription}</Card.Text>
            <Card.Subtitle className="mb-2 text-primary fs-4">
              Price: ₹{product.productprice}
            </Card.Subtitle>
            <Button 
              variant="success" 
              className="mt-3 w-100" 
              onClick={() => dispatch(addtocart(product))}
              disabled={isItemInCart}
            >
              {isItemInCart ? "✓ Added to Cart" : "Add to Cart"}
            </Button>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
}


export default Products