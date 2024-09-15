import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaHome, FaUser, FaSearch } from "react-icons/fa";
import "./AppLayout.style.css";
import { useTrackPlayer } from "../common/Player/TrackPlayerProvider/TrackPlayerProvider";
import TrackPlayerBottom from "../common/Player/TrackPlayerBottom/TrackPlayerBottom";

const AppLayout = () => {
  const [navSearchQuery, setNavSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleNavSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearchQuery) {
      navigate(`/search?query=${navSearchQuery}`);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const { trackPlayerIsVisible } = useTrackPlayer();

  return (
    <div>
      <Navbar
        expand="lg"
        style={{ backgroundColor: "#000000" }}
        variant="dark"
        className="navbar-custom"
      >
        <Container fluid>
          <Navbar.Brand onClick={handleLogoClick} className="text-light">
          <img
            width={60}
            src="/navlogo.jpg" // public 폴더에 저장된 이미지 경로
            alt="Logo"
          />

          </Navbar.Brand>

          <div className="d-lg-none d-flex align-items-center">
            <Link to="/user" className="text-light me-2">
              <FaUser />
            </Link>
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
                  style={{ borderRadius: "50px", width: "400px" }}
                  value={navSearchQuery}
                  onChange={(e) => setNavSearchQuery(e.target.value)}
                />
                <Button
                  variant="outline-light"
                  style={{ borderRadius: "50%" }}
                  type="submit"
                >
                  <FaSearch />
                </Button>
              </Form>
            </Nav>

            <Nav className="ms-auto d-none d-lg-flex align-items-center">
              <Link to="/user" className="nav-link text-light">
                <FaUser className="fs-4 icon-hover" />
              </Link>
              <Link to="/" className="nav-link text-light">
                <FaHome className="fs-3 icon-hover" />
              </Link>
            </Nav>

            <Nav className="d-lg-none d-flex flex-column">
              <Link to="/" className="nav-link text-light">
                Home
              </Link>
              <Link to="/search" className="nav-link text-light">
                Search
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {trackPlayerIsVisible && <TrackPlayerBottom track={null} />}
      <Outlet />
    </div>
  );
};

export default AppLayout;
