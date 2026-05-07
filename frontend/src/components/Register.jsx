import React from 'react'
import Button from 'react-bootstrap/Button';
import toast from 'react-hot-toast';
import Form from 'react-bootstrap/Form';
import { useFormik} from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../redux/authSlice';

import useAxios from '../hooks/axios';

function Register() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const axios =useAxios();
    const formik=useFormik({
        initialValues:{
            fullname:'',
            email:'',
            age:'',
            password:'',
            confirmpassword:'',
        },
        validationSchema:Yup.object({
            fullname:Yup.string().required("Name  is required"),
            email:Yup.string().email("invalid email").required("Email is required"),
            age:Yup.number().typeError("Age must be a number").min(18,"Age must be above 18").required("age is required"),
            password:Yup.string().min(6,"password must conatin 6 characters").max(12,"password must be at most 12 characters").required("password is required"),
            confirmpassword:Yup.string().oneOf([Yup.ref("password"),null],"Password must match").required("required")
        }),
        onSubmit:async (values)=>{


         const { confirmpassword:_unused, ...userData} =values;


            console.log(userData);

            try{
              const {data} = await axios.post("/user/register",userData);
             toast.success(data?.message);
              dispatch(register(data.user));
              navigate('/login');
            }
            catch(error){
              toast.error(error?.response?.data?.message || error.message);
            }
            
            }
           
            

            
        })
    
  return (
    <div className='md-' style={{ width: "400px",margin:' 40px auto',height:'auto', backgroundColor: "#f8f9fa",   // light gray background
    borderRadius: "12px",boxSizing:'border-box',padding:'10px 20px',
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"  }}>
        <h2
  style={{
    textAlign: "center",
    marginBottom: "25px",
    fontWeight: "600",
   
    // display: "inline-block",
    paddingBottom: "5px",
  }}
>
  Register
</h2>

       <Form onSubmit={formik.handleSubmit}>
         <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text"
         placeholder="Enter full name" 
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
       <Form.Group className="mb-3" controlId="formBasicage">
        <Form.Label>Age</Form.Label>
        <Form.Control type="number"
         placeholder=" enter age"
         name='age'
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.age}
         />
         {formik.touched.age && formik.errors.age && 
         (
            <div style={{color:'red'}}>{formik.errors.age}</div>
         )}
      </Form.Group> 

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"
         placeholder="Password"
         name='password'
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.password}
         />
         {formik.touched.password && formik.errors.password && 
         (
            <div style={{color:'red'}}>{formik.errors.password}</div>
         )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formconfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password"
         placeholder=" Confirm Password"
         name='confirmpassword'
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.confirmpassword}
         />
         {formik.touched.confirmpassword && formik.errors.confirmpassword && 
         (
            <div style={{color:'red'}}>{formik.errors.confirmpassword}</div>
         )}
      </Form.Group>
     <div style={{ display: "flex", justifyContent: "center"}}><Button variant="primary" type="submit">
        Submit
      </Button></div>
    
    </Form>
    </div>
  )
}

export default Register
