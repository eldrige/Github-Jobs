import React from 'react';
import { Spinner, Button } from 'react-bootstrap';

const Loader = () => {
  return (
    <Button variant="primary" disabled className="my-5">
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
        // style={{
        //   width: '100px',
        //   height: '100px',
        //   margin: 'auto',
        //   display: 'block',
        // }}
      />
      Loading...
    </Button>
  );
};

export default Loader;
