import React from 'react';
import PropTypes from 'prop-types';

interface Props {
  title: string;
  message: string;
}

const Customer: React.FC<Props> = ({ title, message }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  );
};

Greeting.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Customer;
