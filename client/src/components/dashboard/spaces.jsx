import React from 'react';
import MediaQuery from 'react-responsive';
import Space from './space.jsx';

const Spaces = (props) => {
  const { spaces } = props;

  return (
    <div className="content-box">
      <MediaQuery minDeviceWidth={800}>
        <div className="mini-heading-box-top">
          <h5>Your Spaces</h5>
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={600}>
        <div className="mini-heading-box-top-mobile">
          <h5>Your Spaces</h5>
        </div>
      </MediaQuery>
      <div>
        {spaces.map(space => (
          <Space space={space} key={space.id} />
        ))}
      </div>
    </div>
  );
};

export default Spaces;
