
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './carousal.css';

import React from 'react'

function Carousal({products}) {

    // const [products, setProducts] = useState([]);


    // useEffect(() => {
    //     async function fetchProducts() {
    //         const data = await getAllProducts();
    //         setProducts(data.products.slice(0, 5)); // Get first 5 products for the carousel
    //     }
    //     fetchProducts();
    // });
  return (
    <div style={{padding:"20px"}}>
      <h3>Featured Products</h3>
        <Swiper
           modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
        }} >
            {products.map((product)=>(
                // <SwiperSlide key={product.id}>
                //     <div className="card">
                //         <img src={product.thumbnail} alt={product.title} 
                //         className="card-img-top"
                //          style={{ height: "180px", objectFit: "cover" }}/>
                //         <div className="card-body">
                //             <h6 className="card-title" style={{ fontSize: "16px" }}>{product.title}</h6>
                //             <p className="card-text text-success">₹{product.price}</p>
                //             <button className="btn btn-sm btn-primary">Add to Cart</button>
                //         </div>
                //     </div>
                //     </SwiperSlide>
                <SwiperSlide key={product.id}>
  <div className="card product-card h-100">
    <div className="img-wrapper">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="card-img-top"
      />
    </div>

    <div className="card-body d-flex flex-column">
      <h6 className="card-title product-title">
        {product.title}
      </h6>

      {/* <p className="product-price">₹{product.price}</p> */}

                   <Button
                         variant="primary"
                         className="mt-3 w-100"
                       link as={Link} to={`/product/${product.id}`}
                       >
                         view Details
                       </Button>
    </div>
  </div>
</SwiperSlide>

            ))}


        </Swiper>
      
    </div>
  )
}

export default Carousal
