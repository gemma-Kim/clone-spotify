import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaEye, FaEyeSlash, FaHome, FaUser } from 'react-icons/fa';
import './AppLayout.style.css';

const AppLayout = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <div>
      <Navbar expand="lg" style={{ backgroundColor: '#000000' }} variant="dark" className="navbar-custom">
        <Container fluid>
          <Navbar.Brand href="#" className="text-light">Logo</Navbar.Brand>

          <div className="d-lg-none d-flex align-items-center">
            <FaUser className="text-light me-2" />
            <Navbar.Toggle aria-controls="navbarScroll" />
          </div>

          <Navbar.Collapse id="navbarScroll" className="navbar-collapse-custom">
            <Form className="d-flex mx-auto d-lg-none">
              <Nav className="nav-links">
                <Nav.Link href="#home" className="text-light">Home</Nav.Link>
                <Nav.Link href="#search" className="text-light">Search</Nav.Link>
                {isLoggedIn ? (
                  <Nav.Link href="#logout" className="text-light" onClick={handleLogout}>Logout</Nav.Link>
                ) : (
                  <Nav.Link href="#login" className="text-light" onClick={handleShowLoginModal}>Login</Nav.Link>
                )}
              </Nav>
            </Form>

            <Nav className="ms-auto d-none d-lg-flex">
              <Form className="d-flex mx-2">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  style={{ borderRadius: '50px', width: '400px' }}
                />
                <Button
                  variant="outline-light"
                  style={{ borderRadius: '50px' }}
                >
                  Search
                </Button>
              </Form>
            </Nav>

            <Nav className="ms-auto d-none d-lg-flex">
              <Nav.Link href="#home" className="text-light">
                <FaHome />
              </Nav.Link>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showLoginModal} onHide={handleCloseLoginModal} contentClassName="bg-dark text-light">
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
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
              style={{ backgroundColor: '#77DD77', borderColor: '#77DD77', borderRadius: '50px' }}
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
