import React from 'react';
import ChatRoom from './chat-room.jsx';

class ChatMain extends React.Component {
  render() {
    return (
      <div>
        <h1>Messages</h1>
        <ChatRoom />
      </div>
    );
  }
}

export default ChatMain;
