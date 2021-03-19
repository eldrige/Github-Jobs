import React from 'react';
import { Form, Col } from 'react-bootstrap';

const SearchForm = ({ params, onParamChange }) => {
  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={onParamChange}
            value={params.description}
            name="description"
            type="text"
          />
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default SearchForm;
