import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaEye, FaEyeSlash, FaHome, FaUser, FaSearch } from 'react-icons/fa';
import './AppLayout.style.css';

const AppLayout = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState(''); 
  const navigate = useNavigate(); 

  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해 주세요.');
      return;
    }

    alert('로그인 처리');
    setIsLoggedIn(true);
    setEmail('');
    setPassword('');
    handleCloseLoginModal();
  };

  const handleLogout = () => {
    alert('로그아웃 처리');
    setIsLoggedIn(false);
  };

  const handleNavSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearchQuery) {
      navigate(`/search?query=${navSearchQuery}`); 
    }
  };

  return (
    <div>
      <Navbar  expand="lg" style={{ backgroundColor: '#000000' }} variant="dark" className="navbar-custom">
        <Container fluid>
          <Navbar.Brand as={Link} to="/"  className="text-light">
             <img width={50} src='https://postfiles.pstatic.net/MjAyNDA5MTFfMTky/MDAxNzI1OTk1NjYxNjky.UJp5MT2LcR8VBXsss3yoM3vMJE_Bc9RqG8hBTtz2MQAg.LVisv2WONna-GSnM_gEms38xKPEHEq70CGr0t8am7OQg.JPEG/IMG_8438.JPG?type=w966' />
          </Navbar.Brand>

          <div className="d-lg-none d-flex align-items-center">
            <FaUser className="text-light me-2" />
            <Navbar.Toggle aria-controls="navbarScroll" />
          </div>

          <Navbar.Collapse id="navbarScroll" className="navbar-collapse-custom">
            <Nav className="ms-auto d-none d-lg-flex">
              <Form className="d-flex mx-2" onSubmit={handleNavSearchSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  style={{ borderRadius: '50px', width: '400px' }}
                  value={navSearchQuery}
                  onChange={(e) => setNavSearchQuery(e.target.value)}
                />
                <Button variant="outline-light" style={{ borderRadius: '50px' }} type="submit">
                  <FaSearch />
                </Button>
              </Form>
            </Nav>

            <Nav className="ms-auto d-none d-lg-flex">
              <Link to="/" className="nav-link text-light">
                <FaHome />
              </Link>
              {isLoggedIn ? (
                <Button
                  variant="outline-light"
                  className="ms-2"
                  style={{ borderRadius: '50px' }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="outline-light"
                  className="ms-2"
                  style={{ borderRadius: '50px' }}
                  onClick={handleShowLoginModal}
                >
                  Login
                </Button>
              )}
            </Nav>

            <Nav className="d-lg-none d-flex flex-column">
              <Link to="/" className="nav-link text-light">Home</Link>
              <Link to="/search" className="nav-link text-light">Search</Link>
              {isLoggedIn ? (
                <Nav.Link as="div" className="text-light" onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <Nav.Link as="div" className="text-light" onClick={handleShowLoginModal}>Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showLoginModal} onHide={handleCloseLoginModal} contentClassName="bg-dark text-light">
        <Modal.Header closeButton closeVariant="white">
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center">
          <h1 className="text-center">Apptify 에 로그인하기</h1>
          <Form onSubmit={handleLoginSubmit} className="w-75">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="bg-dark text-light"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="bg-dark text-light"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="outline-light"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Button
              style={{ backgroundColor: '#1ED760', borderColor: '#1ED760', borderRadius: '50px' }}
              type="submit"
              className="w-100"
            >
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Outlet />
    </div>
  );
};

export default AppLayout;
