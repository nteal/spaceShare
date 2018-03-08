import React from 'react';
import Message from './message.jsx';

class Messages extends React.Component {
  render() {
    return (
      <div className="content-box">
        <div className="mini-heading-box-top">
          <h5>You have 0 new messages!</h5>
        </div>
        <Message />
      </div>
    );
  }
}

export default Messages;
