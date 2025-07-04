import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./AppLayout.style.css";
import PlayerBottom from "@features/player/PlayerBottom/PlayerBottom";
import { faHome, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePlayer } from "src/contexts";

const AppLayout = () => {
  const [navSearchQuery, setNavSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleNavSearchSubmit = (event: any) => {
    event.preventDefault();
    if (navSearchQuery) {
      navigate(`/search?query=${navSearchQuery}`);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const { trackPlayerIsVisible } = usePlayer();

  return (
    <div>
      <Navbar expand="lg" variant="dark" className="navbar-custom">
        <Navbar.Brand onClick={handleLogoClick} className="text-light">
          <img width={60} src="/navlogo.jpg" alt="Logo" />
        </Navbar.Brand>

        <div className="d-lg-none d-flex align-items-center">
          <Link to="/user" className="text-light me-2">
            <FontAwesomeIcon icon={faUser} />
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
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form>
          </Nav>

          <Nav className="ms-auto d-none d-lg-flex align-items-center">
            <Link to="/user" className="nav-link text-light">
              <FontAwesomeIcon icon={faUser} />
            </Link>
            <Link to="/" className="nav-link text-light">
              <FontAwesomeIcon icon={faHome} />
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
      </Navbar>
      {trackPlayerIsVisible && <PlayerBottom />}
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
