import React from 'react';
import { Form, Col } from 'react-bootstrap';

const SearchForm = ({ params, onParamChange }) => {
  return (
    <Form>
      <Form.Row className="align-items-end">
        <Form.Group as={Col}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={onParamChange}
            value={params.description}
            name="description"
            type="text"
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Location</Form.Label>
          <Form.Control
            onChange={onParamChange}
            value={params.location}
            name="description"
            type="text"
          />
        </Form.Group>
        <Form.Group as={Col} className="ml-2">
          <Form.Check
            onChange={onParamChange}
            value={params.full_time}
            name="full_time"
            id="full time"
            label="Only full time"
            className="mb-2"
          />
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default SearchForm;
