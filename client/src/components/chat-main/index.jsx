import React from 'react';
import PropTypes from 'prop-types';
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
    const { allUserChats } = this.props;
    return (
      <div>
        {/* side nav listing all user's chats */}
        <h1>Messages</h1>
        <ChatRoom />
      </div>
    );
  }
}

ChatMain.propTypes = {
  allUserChats: PropTypes.object,
  chatClient: PropTypes.object,
};

ChatMain.defaultProps = {
  allUserChats: null,
  chatClient: null,
};

export default ChatMain;
