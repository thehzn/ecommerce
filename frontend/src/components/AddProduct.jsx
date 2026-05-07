
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addProductToStore } from '../redux/productsSlice';
import toast from 'react-hot-toast';
import { Container, Button, Alert, Spinner } from 'react-bootstrap';


import useAxios from '../hooks/axios';


const AddProduct = () => {
    const dispatch = useDispatch();
    const axios =useAxios();
    // const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
   

    // 1. Validation Schema
    const ProductSchema = Yup.object().shape({
        productname: Yup.string().required('Product name is required'),
        productprice: Yup.number().positive('Price must be positive').required('Price is required'),
        productdescription: Yup.string().min(10, 'Description too short'),
        productimage:Yup.mixed().required('A photo is required').test('fileType','Unsupported File Format',value=>{
            return value && ['image/jpeg' ,'image/png' , 'image/jpg'].includes(value.type);
        })
    });

    return (
        <Container className="mt-5" style={{ maxWidth: '600px' }}>
            <h2 className="mb-4">Add New Product</h2>
            
            

            <Formik
                initialValues={{ productname: '', productprice: '', productdescription: '',productimage: null }}
                validationSchema={ProductSchema}
                onSubmit={async (values, {resetForm}) => {
                    setLoading(true);

                    // 1. Create the FormData object
                    const formData = new FormData();
                    formData.append('productname', values.productname);
                    formData.append('productprice', values.productprice);
                    formData.append('productdescription', values.productdescription);
                    formData.append('productimage', values.productimage); // The file
                   
                    try {
                        // 2. Call your Mongoose Backend
                        // Use { withCredentials: true } to pass your admin token/cookie
                        const res = await axios.post('/product/addproduct', formData, {
                            headers:{ 'Content-Type' :'multipart/form-data'}
                            });

                        // 3. Update Redux Store
                        dispatch(addProductToStore(res.data.product));
                         toast.success(res.data?.message);
                            resetForm();
                        // alert("Product Added Successfully!");
                       
                        //  navigate('/admin/products'); // Redirect to list view
                    } catch (error) {
                        console.log("FULL ERROR OBJECT:", error);
                        toast.error(error.response?.data?.message||"error in adding product");
                    } finally {
                        setLoading(false);
                    }
                }}
            >
                {({setFieldValue, errors, touched }) => (
                    <Form className="shadow p-4 rounded bg-light">
                        <div className="mb-3">
                            <label>Product Name</label>
                            <Field name="productname" className={`form-control ${errors.productname && touched.productname ? 'is-invalid' : ''}`} />
                            {errors.productname && touched.productname && <div className="invalid-feedback">{errors.productname}</div>}
                        </div>

                        <div className="mb-3">
                            <label>Price ($)</label>
                            <Field name="productprice" type="number" className={`form-control ${errors.productprice && touched.productprice ? 'is-invalid' : ''}`} />
                            {errors.productprice && touched.productprice && <div className="invalid-feedback">{errors.productprice}</div>}
                        </div>

                        

                        <div className="mb-3">
                            <label>Description</label>
                            <Field as="textarea" name="productdescription" className={`form-control ${errors.productdescription && touched.productdescription ? 'is-invalid' : ''}`} />
                             {errors.productdescription && touched.productdescription && <div className="invalid-feedback">{errors.productdescription}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Upload Image</label>
                            <input 
                                type="file" 
                                className="form-control"
                                onChange={(e) => setFieldValue("productimage", e.target.files[0])} 
                            />
                            {errors.productimage && touched.productimage && (
                                <div className="text-danger mt-1">{errors.productimage}</div>
                            )}
                        </div>

                        <Button type="submit" variant="dark" className="w-100" disabled={loading}>
                            {loading ? <Spinner size="sm" /> : 'Create Product'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default AddProduct;