
import { Card,Button} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import toast from 'react-hot-toast';
import Form from 'react-bootstrap/Form';
import { useFormik} from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import {  updateProfile } from '../redux/authSlice';
import useAxios from "../hooks/axios";




function Profile() {
  const dispatch =useDispatch();
 const axios =useAxios();
  const user = useSelector((state) => state.auth.user);
  const [isEdit,setIsEdit] =useState(false);
  
const formik=useFormik({
        initialValues:{
            fullname:user.fullname,
            email:user.email
        },
        validationSchema:Yup.object({
            fullname:Yup.string().required("Name  is required"),
            email:Yup.string().email("invalid email").required("Email is required"),
           
            
           
        }),
        onSubmit:async (values)=>{


       

            try{
              const {data} = await axios.patch("/user/updateprofile",values);
             toast.success(data?.message);
              dispatch(updateProfile(data.user));
              setIsEdit(false);
            }
            catch(error){
              toast.error(error?.response?.data?.message || error.message);
            }
            
            }
           
            

            
        })
 



  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px",marginBottom:'50px' }}>
      {isEdit ?  
       <Form onSubmit={formik.handleSubmit}>
         <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text"
        
         name='fullname'
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.fullname}
         />
         {formik.touched.fullname && formik.errors.fullname && 
         (
            <div style={{color:'red'}}>{formik.errors.fullname}</div>
         )}
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email"
         placeholder="Enter email"
         name='email'
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.email}
         />
         {formik.touched.email && formik.errors.email && 
         (
            <div style={{color:'red'}}>{formik.errors.email}</div>
         )}
       
      

     
    </Form.Group>
     <div style={{ display: "flex", justifyContent: "center"}}><Button variant="primary" type="submit">
        Submit
      </Button></div>
    
    </Form>   :
      
      
      <Card style={{ width: "400px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", display:"flex",justifyContent:"center" }}>
         <Card.Img variant="top" className="mx-auto mt-3 rounded-circle" // mx-auto centers it, rounded-circle makes it a circle
  style={{ width: "100px", height: "100px", objectFit: "cover" }} src="https://tse4.mm.bing.net/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?pid=Api&P=0&h=180" />
        <Card.Body className="text-center">
          

          <p><strong>Fullname:</strong> {user.fullname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          

          <div className="text-center mt-3">
            <Button variant="primary" onClick={()=>setIsEdit(!isEdit)} >
             {isEdit?"Cancel":"Edit Profile"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    }
  
    </div>
  );
}

export default Profile;
