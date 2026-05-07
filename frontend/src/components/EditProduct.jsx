

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { Container, Form, Button, Image, Spinner } from 'react-bootstrap';
import { updateProductInStore } from '../redux/productsSlice';
import toast from 'react-hot-toast';
import useAxios from '../hooks/axios';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axios =useAxios();
  const BASE_URL = "http://localhost:4000";

  // State for form fields
  const [productData, setProductData] = useState({
    productname: '',
    productprice: '',
    productdescription: ''
    
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Fetch existing product details on load
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/product/${id}`, {
          withCredentials: true});
        if (data.success) {
          setProductData({
            productname: data.product.productname,
            productprice: data.product.productprice,
            productdescription: data.product.productdescription,
           
          });
          setPreview(`${BASE_URL}${data.product.productimage}`);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Could not load product details");
        navigate('/admin/products');
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file)); // Update preview locally
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 2. Prepare FormData (Required for Multer/Image uploads)
    const formData = new FormData();
    formData.append('productname', productData.productname);
    formData.append('productprice', productData.productprice);
    formData.append('productdescription', productData.productdescription);
    
    if (imageFile) {
      formData.append('productimage', imageFile);
    }

    try {
      const {data}  = await axios.put(`/product/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
 toast.success(data?.message);
      // 3. Update Redux and Redirect
      dispatch(updateProductInStore(data.product));
      
      navigate('/admin/products');
    } catch (error) {
      console.error("Update failed:", error);
     toast.error(error.response?.data?.message||"update failed");
    }
  };

  if (loading) return <Container className="text-center my-5"><Spinner animation="border" /></Container>;

  return (
    <Container className="my-5" style={{ maxWidth: '600px' }}>
      <h2>Edit Product</h2>
      <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control 
            name="productname" 
            value={productData.productname} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price (₹)</Form.Label>
          <Form.Control 
            type="number" 
            name="productprice" 
            value={productData.productprice} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Current / New Image</Form.Label>
          <div className="mb-2">
            <Image src={preview} width="100" thumbnail />
          </div>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
}

export default EditProduct;
