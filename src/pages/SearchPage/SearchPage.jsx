import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import './SearchPage.style.css'; 

const SearchPage = () => {
  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <Form className="d-flex w-100 search-form">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2 search-input"
          aria-label="Search"
        />
        <Button variant="primary" className="search-button">
          <FaSearch className="search-icon" />
        </Button>
      </Form>
    </Container>
  );
};

export default SearchPage;
