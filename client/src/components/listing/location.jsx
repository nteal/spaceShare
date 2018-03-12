import React from 'react';
import MediaQuery from 'react-responsive';

const Location = (props) => {
  let displayText;
  if (props.open) {
    const { neighborhood } = props;
    displayText = <h6>{neighborhood}</h6>;
  } else {
    const { address, city, state, zip } = props;
    displayText = (
      <h6>
        {address}<br />
        {city}, {state} {zip}
      </h6>
    );
  }

  return (
    <div className="content-box">
      <MediaQuery minDeviceWidth={800}>
        <div className="mini-heading-box-top">
          <h5>Location</h5>
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={600}>
        <div className="mini-heading-box-top-mobile">
          <h5>Location</h5>
        </div>
      </MediaQuery>
      <div className="invisible-content-box">
        {displayText}
      </div>
    </div>
  );
};

export default Location;
