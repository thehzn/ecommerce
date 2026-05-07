import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

function Header() {
    const cartitems = useSelector((state) => state.cart.items);
    const user=useSelector((state)=>state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
}
const totalItems = cartitems.reduce(
  (sum, item) => sum + item.qty,
  0
);


    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
            <Container fluid>

                {/* FIXED BRAND */}
                <Navbar.Brand as={Link} to="/">
                    E-Commerce
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                         <Nav.Link as={Link} to="/about">About Us</Nav.Link>

                        <Nav.Link as={Link} to="/cart">
                            {`Cart🛒 ${totalItems}`}
                        </Nav.Link>

                        {/* If User is Admin, show a specific Admin Menu */}
                        {user && user.role === 'admin' && (
                            <NavDropdown title="Admin Panel" id="admin-nav-dropdown" className="fw-bold text-warning">
                                <NavDropdown.Item as={Link} to="/admin/products">
                                    Manage Products
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/admin/users">
                                    Manage Users
                                </NavDropdown.Item>
                                {/* <NavDropdown.Item as={Link} to="/admin/add-product">
                                    Add New Product
                                </NavDropdown.Item> */}
                                {/* <NavDropdown.Item as={Link} to="/admin/orders">
                                    Manage Orders
                                </NavDropdown.Item> */}
                            </NavDropdown>
                        )}

                        <NavDropdown title={user ? user.fullname : "Account"} id="basic-nav-dropdown">



                           {!user ? (
                            <>
                            <NavDropdown.Item as={Link} to="/login">
                                Login
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/register">
                                Register
                            </NavDropdown.Item>
                           </>
                            
                           ):(<>
                           <NavDropdown.Item as={Link} to="/profile">
                            Profile
                             </NavDropdown.Item>
                             <NavDropdown.Divider />
                             
                           <NavDropdown.Item  onClick={handleLogout} className="text-danger">
                                Logout 
                            </NavDropdown.Item>
                            </>)}
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Container >
        </Navbar>
    );
}

export default Header;

