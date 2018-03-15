import React from 'react';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';

const AboutBox = (props) => {
  const { heading, text } = props;
  return (
    <div className="content-box">
      <MediaQuery minDeviceWidth={800}>
        <div className="mini-heading-box-top">
          <h5>{heading}</h5>
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={600}>
        <div className="mini-heading-box-top-mobile">
          <h5>{heading}</h5>
        </div>
      </MediaQuery>
      <div className="invisible-content-box">
        {text}
      </div>
    </div>
  );
};

AboutBox.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.string,
};

AboutBox.defaultProps = {
  heading: 'About',
  text: 'No description provided.',
};

export default AboutBox;
