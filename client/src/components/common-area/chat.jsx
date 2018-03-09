import React from 'react';
import MediaQuery from 'react-responsive';

const Chat = (props) => {
  return (
    <div className="content-box">
      <MediaQuery minDeviceWidth={800}>
        <div className="mini-heading-box-top">
          <h5>Space Chat</h5>
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={600}>
        <div className="mini-heading-box-top-mobile">
          <h5>Space Chat</h5>
        </div>
      </MediaQuery>
    </div>
  );
};

export default Chat;
