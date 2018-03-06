import React from 'react';
import ChatRoom from './chat-room.jsx';

class ChatMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log('chat did mount');
  }
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
