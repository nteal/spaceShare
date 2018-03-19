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
    const { incomingMessages, typingStatus, chat } = this.props;

    let displayHeading = (/[qypg]/).test(chat.display_name) ? (
      <div className="heading-box-chat chat-descender">
        <h4>{chat.display_name}</h4>
      </div>
    ) : (
      <div className="heading-box-chat">
        <h4>{chat.display_name}</h4>
      </div>
    );
    return (
      <div className="col">
        <div className="row pt-2 pl-2">
          {displayHeading}
        </div>
        <div className="row messages-container">
          <div className="col message-col">
            <div className="pt-2 py-2">
              {/* Messages go here */}
              {incomingMessages.map(message => (
                <ChatBubble message={message} key={message.timestamp} />
              ))}
            </div>
          </div>
        </div>
        <div className="row status-row pb-1">
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
  incomingMessages: PropTypes.array,
  typingStatus: PropTypes.string,
};

ChatRoom.defaultProps = {
  incomingMessages: [],
  typingStatus: '',
};

export default ChatRoom;
