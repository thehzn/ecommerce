import Carousel from 'react-bootstrap/Carousel';
import img1 from "../assets/carouselimg1.webp";
import img2 from "../assets/carouselimg2.webp";
import img3 from "../assets/carouselimg3.webp";

function Carouselcomp() {
  return (
    <Carousel style={{marginTop:'0',padding:'0px'}}>
      <Carousel.Item>
        <img
    className="d-block w-100"
   src={img1}
    alt="First slide"
    style={{ height: '500px', objectFit: 'cover',imageRendering: 'auto'  }} // Ensures image doesn't look stretched
  />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
    className="d-block w-100"
    src={img2}// Or a local path like /images/slide1.jpg
    alt="First slide"
    style={{ height: '500px', objectFit: 'cover',imageRendering: 'auto' }} // Ensures image doesn't look stretched
  />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
       <img
    className="d-block w-100"
    src={img3} // Or a local path like /images/slide1.jpg
    alt="First slide"
    style={{ height: '500px', objectFit: 'cover' ,imageRendering: 'auto' }} // Ensures image doesn't look stretched
  />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carouselcomp;