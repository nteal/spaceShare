import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ChatBubble from '../common-area/chatBubble.jsx';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
    this.handleStopTyping = this.handleStopTyping.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.sendMessageOnEnter = this.sendMessageOnEnter.bind(this);
  }
  handleChange(event) {
    const { value } = event.target;
    this.setState({ newMessage: value });
  }

  handleTyping(event) {
    const { chat } = this.props;
    chat.startTyping();
  }

  handleStopTyping(event) {
    const { chat } = this.props;
    chat.stopTyping();
  }

  sendMessage() {
    const { newMessage } = this.state;
    const { chat } = this.props;

    chat
      .sendText(newMessage)
      .then(() => {
        this.setState({ newMessage: '' });
      })
      .catch(error => console.error('error sending message', error));
  }
  sendMessageOnEnter(event) {
    const { newMessage } = this.state;
    const { chat, incomingMessages } = this.props;

    if (event.key === 'Enter') {
      chat
        .sendText(newMessage)
        .then(() => {
          this.setState({ newMessage: '' });
        })
        .catch(error => console.error('error sending message', error));
    }
  }
  render() {
    const { newMessage } = this.state;
    const {
      incomingMessages,
      typingStatus,
      chat,
      category,
      chatLinkId,
      displayName,
    } = this.props;
    const link = category === 'user' ? '/profile' : '/listing';

    let glyph;
    if (category === 'user') {
      glyph = <i className="material-icons mr-1">person</i>;
    } else if (category === 1) {
      glyph = <i className="material-icons mr-1">business</i>;
    } else {
      glyph = <i className="material-icons mr-1">home</i>;
    }
    const headingDisplayName = category === 'user' ? displayName : chat.display_name;

    const idProperty = category === 'user' ? 'userId' : 'spaceId';

    const displayHeading = (/[qypg]/).test(chat.display_name) ? (
      <div className="heading-box-chat chat-descender">
        <div className="col">
          <Link to={{ pathname: link, state: { [idProperty]: chatLinkId } }}>
            <div className="row">
              {glyph}
              <h4>{headingDisplayName}</h4>
            </div>
          </Link>
        </div>
      </div>
    ) : (
      <div className="heading-box-chat">
        <div className="col">
          <Link to={{ pathname: link, state: { [idProperty]: chatLinkId } }}>
            <div className="row">
              {glyph}
              <h4>{headingDisplayName}</h4>
            </div>
          </Link>
        </div>
      </div>
    );
    return (
      <div className="col">
        <div className="row pt-2 pl-2">
          {displayHeading}
        </div>
        <div className="row messages-container pl-1">
          <div className="col message-col">
            <div className="pt-2 py-2">
              {/* Messages go here */}
              {incomingMessages.map(message => (
                <ChatBubble message={message} key={message.timestamp} />
              ))}
            </div>
          </div>
        </div>
        <div className="row status-row pb-1 pl-1">
          <small>{typingStatus}</small>
        </div>
        <div className="row align-self-end pl-1 pr-1 pb-2">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={newMessage}
              onChange={this.handleChange}
              onKeyPress={this.sendMessageOnEnter}
              onFocus={this.handleTyping}
              onBlur={this.handleStopTyping}
              placeholder={`Say something to ${chat.display_name}...`}
              aria-label="talk in your space chat"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary pb-0" onClick={this.sendMessage} type="button">
                <i className="material-icons">add</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChatRoom.propTypes = {
  category: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  incomingMessages: PropTypes.array,
  typingStatus: PropTypes.string,
  chatLinkId: PropTypes.number,
  displayName: PropTypes.string,
};

ChatRoom.defaultProps = {
  category: '',
  incomingMessages: [],
  typingStatus: '',
  chatLinkId: 0,
  displayName: 'Bobo',
};

export default ChatRoom;
