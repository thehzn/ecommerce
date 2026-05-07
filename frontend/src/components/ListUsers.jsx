import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Form } from 'react-bootstrap';
import {setUsers,updateUserStatus} from '../redux/authSlice';
import useAxios from '../hooks/axios';
import { useDispatch,useSelector } from 'react-redux';

const ListUsers = () => {
  const users =  useSelector((state) => state.auth.allUsers);
  const axios =useAxios();
  const dispatch= useDispatch();
  
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response= await axios.get('/user/users');
     

        
       dispatch(setUsers(response.data.users))
        toast.success(`Successfully loaded ${response.data.users.length} users`);
        console.log("Toast Triggered");
        setLoading(false);
      } catch (err) {
       
        const errorMessage = err.response?.data?.message || "Failed to fetch users";
        toast.error(errorMessage);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserStatusChange=async(userId)=>{
   

    try{
       console.log("userId---->",userId);
const {data} = await axios.patch(`/user/update-status/${userId}`,{});
console.log(data);

dispatch(updateUserStatus(data.user));
toast.success("updated userStatus");
 setLoading(false);
    }
    catch(error){
      const errorMessage = error.response?.data?.message || "Failed to update status";
        toast.error(errorMessage);
        setLoading(false);
    }
    

  }
  if (loading) return <div className="text-center mt-5">Loading Users...</div>;

  return (
    <div className="container mt-4">
      <h3>Admin: User Management</h3>
      <table className="table table-hover border">
        <thead className="table-dark">
          <tr>
           
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,i) => (
            <tr key={user._id}>
             
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td> 
                 <Form.Check // prettier-ignore
                 defaultChecked={user?.status}
        type="switch"
        onChange={()=>handleUserStatusChange(user?._id)}
        id={`custom-switch-${i}`}
        label={user.status ?'Active':'Inactive'}
            />
      </td>
              <td><span className="badge bg-info">{user.role}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUsers;