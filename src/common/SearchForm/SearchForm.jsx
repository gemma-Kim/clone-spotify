import React from 'react';
import { Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchForm = ({ searchQuery, setSearchQuery, handleFormSubmit }) => (
  <Form className="search-form" onSubmit={handleFormSubmit}>
    <div className="search-input-container">
      <FaSearch className="search-icon" />
      <Form.Control
        type="search"
        placeholder="노래, 아티스트, 앨범 검색"
        className="search-input"
        aria-label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  </Form>
);

export default SearchForm;
