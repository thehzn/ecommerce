import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Table, Image, Button } from 'react-bootstrap';
import { removeProductFromStore } from '../redux/productsSlice'; 
import toast from 'react-hot-toast';


import useAxios from '../hooks/axios';


function ListProducts() {
  const allproducts = useSelector((state) => state.products.items);
  const dispatch = useDispatch();
  const axios =useAxios();

  const BASE_URL = "http://localhost:4000";

  const handleDelete =async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
    
try{
  await axios.delete(`/product/${id}`);
 dispatch(removeProductFromStore(id));
 toast.success("Product deleted successfully!", {
    position: "top-right",
    autoClose: 3000,
  })

}
catch(error){
  console.error("Delete failed:", error);
           toast.error(error.response?.data?.message || "Failed to delete product");
}
      
     
    }
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Product Inventory</h2>
        <Button as={Link} to="/admin/add-product" variant="primary">Add New Product</Button>
      </div>
      
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
           
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allproducts.length > 0 ? (
            allproducts.map((product) => (
              <tr key={product._id} className="align-middle">
                <td>
                  <Image 
                    src={`${BASE_URL}${product.productimage}`} 
                    alt={product.productname}
                    rounded
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                </td>
                <td>{product.productname}</td>
                <td>₹{product.productprice}</td>
               
                <td>
                  <Button 
                    as={Link} 
                    to={`/admin/edit-product/${product._id}`} 
                    variant="outline-info" 
                    size="sm" 
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No products available. <Link to="/add-product">Add one now?</Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListProducts;