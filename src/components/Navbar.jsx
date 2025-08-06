import { Link } from 'react-router'
import { supabase } from './../client'
import { Navbar, Nav, Container, Image } from 'react-bootstrap'
import logo from './../assets/logo.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'

const MyNavbar = () => {
    return (
        <>
            <Navbar expand='lg' style={{ backgroundColor: '#523c15ff' }} variant="dark" className='nav-bar'>
                <Container>
                    <Navbar.Brand as={Link} to='/'>
                        <Image
                            src={logo}
                            alt='KoilKare Logo'
                            width='40'
                            height='40'
                            roundedCircle
                            className='me-2'
                        />
                        <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.5rem' }}>KoilKare</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/explore">Explore</Nav.Link>
                            <Nav.Link as={Link} to="/create-post">Create Post</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default MyNavbar