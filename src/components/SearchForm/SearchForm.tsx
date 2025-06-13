import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

interface SearchFormProps {
  defaultQuery: string;
  onSubmit: (e: string) => void;
}

const SearchForm = ({ defaultQuery, onSubmit }: SearchFormProps) => {
  const [value, setValue] = useState(defaultQuery);

  useEffect(() => {
    setValue(defaultQuery);
  }, [defaultQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <Form className="search-form" onSubmit={handleSubmit}>
      <div className="search-input-container">
        <FaSearch className="search-icon" />
        <Form.Control
          type="search"
          placeholder="Search"
          className="search-input"
          aria-label="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </Form>
  );
};

export default SearchForm;
