// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'; 
// import {removefromcart,updateqty} from '../redux/cartSlice'
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';


// function Cart() {
//      const cartitems=useSelector((state)=>state.cart.items);
//     const dispatch=useDispatch();
//      const carttotal = cartitems.reduce((sum, product) => {
//   return (
//     sum +
//     Number(product.qty) * Number(product.price)
//   );
// }, 0);
//   return (
//     <div>
//       <h4  style={{ width: '100%', textAlign: 'center' }}>Cart</h4>

//             {cartitems.map((product)=>(
//               <Card  key={product.id} style={{width:'18rem',textAlign:'left',padding:' 5px 5px',height:'150px'}}>
                
//                 <Card.Body>
//                   <Card.Title>{product.name}-₹{product.price}×{product.qty}</Card.Title>
                  
//                   <Card.Subtitle>Quantity : <input type="number" min='1'
//                   style={{ display: "inline-block", width: "60px", marginLeft: "6px" }}
//                     value={product.qty}
//                     onChange={(e)=>
//                       dispatch(updateqty({id:product.id,qty:Number(e.target.value)}))
//                     } />
                   
                   
//                   </Card.Subtitle>
//                   <Button variant='primary' style={{borderRadius:'5px',marginTop:'10px',width:'100%',color:'white',backgroundColor:'red'}} onClick={()=>dispatch(removefromcart(product))}>Remove</Button>
//                 </Card.Body>
//               </Card>
//             ))}
//       <h5 style={{ textAlign: "center", marginTop: "20px" }}>
//         Total: ₹{carttotal.toFixed(2)}
//       </h5>
//     </div>
//   )
// }

// export default Cart
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { removefromcart, updateqty } from "../redux/cartSlice";
// import { Card, Button } from "react-bootstrap";

// function Cart() {
//   const cartitems = useSelector((state) => state.cart.items);
//   const dispatch = useDispatch();

//   const carttotal = cartitems.reduce(
//     (sum, product) => sum + product.qty * product.price,
//     0
//   );

//   return (
//     <div className="container-lg my-4 w-lg-100">
//       <h3 className="text-center mb-4">🛒 Your Cart</h3>

//       {cartitems.length === 0 ? (
//         <h5 className="text-center py-5">Your cart is empty!</h5>
//       ) : (
//         <>
//           <div className="row g-3 px-5 d-flex justify-content-center">
//             {cartitems.map((product) => (
//               <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
//                 <Card className="w-100  shadow px-5" style={{ borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", height:"400px",width:'20rem'}}>
//                   <Card.Img
//                     variant="top"
//                     src={product.thumbnail}
//                     style={{ height: "150px", objectFit: "cover", borderRadius: "10px 10px 0 0" }}
//                   />
//                   <Card.Body>
//                     <Card.Title>{product.title}</Card.Title>
//                     <Card.Subtitle className="mb-2">
//                       ₹{product.price} × {product.qty}
//                     </Card.Subtitle>

//                     <div className="d-flex align-items-center mb-2">
//                       <label style={{ marginRight: "10px", fontWeight: "500" }}>
//                         Quantity:
//                       </label>
//                       <input
//                         type="number"
//                         min="1"
//                         value={product.qty}
//                         onChange={(e) =>
//                           dispatch(
//                             updateqty({ id: product.id, qty: Number(e.target.value) })
//                           )
//                         }
//                         className="form-control form-control-sm"
//                         style={{ width: "80px" }}
//                       />
//                     </div>

//                     <Button
//                       variant="danger"
//                       className="w-100"
//                       onClick={() => dispatch(removefromcart(product.id))}
//                     >
//                       Remove
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </div>
//             ))}
//           </div>

//           {/* Total */}
//           <div
//             className="text-center mt-4 p-3"
//             style={{ fontSize: "20px", fontWeight: "bold", borderTop: "2px solid #ddd" }}
//           >
//             Total Amount: ₹{carttotal}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Cart;
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removefromcart, updateqty } from "../redux/cartSlice";
import { Card, Button } from "react-bootstrap";

// Define backend URL for images
const BASE_URL = "http://localhost:4000";

function Cart() {
  const cartitems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // CHANGE: Use product.productprice
  const carttotal = cartitems.reduce(
    (sum, product) => sum + product.qty * product.productprice,
    0
  );

  return (
    <div className="container-lg my-4">
      <h3 className="text-center mb-4">🛒 Your Cart</h3>

      {cartitems.length === 0 ? (
        <h5 className="text-center py-5">Your cart is empty!</h5>
      ) : (
        <>
          <div className="row g-3 d-flex justify-content-center">
            {cartitems.map((product) => (
              // CHANGE: Use product._id for the key
              <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
                <Card className="shadow mx-auto" style={{ borderRadius: "10px", height: "420px", width: '18rem' }}>
                  <Card.Img
                    variant="top"
                    // CHANGE: Use productimage and BASE_URL
                    src={`${BASE_URL}${product.productimage}`}
                    style={{ height: "180px", objectFit: "cover", borderRadius: "10px 10px 0 0" }}
                  />
                  <Card.Body>
                    {/* CHANGE: Use productname */}
                    <Card.Title className="text-truncate">{product.productname}</Card.Title>
                    <Card.Subtitle className="mb-2 text-success">
                      ₹{product.productprice} × {product.qty}
                    </Card.Subtitle>

                    <div className="d-flex align-items-center mb-3 mt-3">
                      <label style={{ marginRight: "10px", fontWeight: "500" }}>
                        Qty:
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={product.qty}
                        onChange={(e) =>
                          dispatch(
                            // CHANGE: Pass _id instead of id
                            updateqty({ id: product._id, qty: Number(e.target.value) })
                          )
                        }
                        className="form-control form-control-sm"
                        style={{ width: "70px" }}
                      />
                    </div>

                    <Button
                      variant="outline-danger"
                      className="w-100 mt-auto"
                      // CHANGE: Pass product._id
                      onClick={() => dispatch(removefromcart(product._id))}
                    >
                      Remove Item
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>

          <div
            className="text-center mt-4 p-4"
            style={{ fontSize: "24px", fontWeight: "bold", background: "#f8f9fa", borderRadius: "10px" }}
          >
            Total Amount: <span className="text-success">₹{carttotal}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

