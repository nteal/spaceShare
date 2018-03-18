import React from 'react';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import ChatBubble from './chatBubble.jsx';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.sendMessageOnEnter = this.sendMessageOnEnter.bind(this);
  }
  handleChange(event) {
    const { value } = event.target;
    this.setState({ newMessage: value });
  }

  sendMessage() {
    const { newMessage } = this.state;
    const { chat } = this.props;
    // this.conversation
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
    // this.conversation
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
    const { incomingMessages } = this.props;
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
        <div className="col">
          <div className="row">
            <div className="col">
              {/* Messages go here */}
              {incomingMessages.map(message => (
                <ChatBubble message={message} />
              ))}
            </div>
          </div>
          <div className="row align-self-end pl-1 pr-1">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={newMessage}
                onChange={this.handleChange}
                onKeyPress={this.sendMessageOnEnter}
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
      </div>
    );
  }
}

Chat.propTypes = {
  incomingMessages: PropTypes.array,
};

Chat.defaultProps = {
  incomingMessages: [],
};

export default Chat;
