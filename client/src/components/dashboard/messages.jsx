import React from 'react';
import Message from './message.jsx';

class Messages extends React.Component {
  render() {
    return (
      <div>
        You have __ new messages!
        <Message />
      </div>
    );
  }
}

export default Messages;
