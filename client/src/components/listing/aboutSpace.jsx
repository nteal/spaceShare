import React from 'react';
import MediaQuery from 'react-responsive';

const AboutSpace = (props) => {
  const { text } = props;
  return (
    <div className="content-box">
      <MediaQuery minDeviceWidth={800}>
        <div className="mini-heading-box-top">
          <h5>About this Space</h5>
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={600}>
        <div className="mini-heading-box-top-mobile">
          <h5>About this Space</h5>
        </div>
      </MediaQuery>
      <div className="invisible-content-box">
        {text}
      </div>
    </div>
  );
};

export default AboutSpace;
