import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <div className="row justify-content-center pt-5 pb-5">
    <small>
      <Link to="/terms">
        Terms of use
      </Link>
      &nbsp;|&nbsp;
      <Link to="/privacy-policy">
        Privacy policy
      </Link>
    </small>
  </div>
);

export default Footer;
