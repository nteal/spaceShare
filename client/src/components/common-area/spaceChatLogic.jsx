import React from 'react';
import PropTypes from 'prop-types';
import Chat from './chat.jsx';

class SpaceChatLogic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: '',
      incomingMessages: [],
    };
    this.setupConversationEvents = this.setupConversationEvents.bind(this);
    this.joinConversation = this.joinConversation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  componentDidMount() {
    this.joinConversation(localStorage.getItem('id_token'));
  }
  setupConversationEvents(conversation) {
    this.conversation = conversation;
    console.log('*** Conversation Retrieved', conversation);
    console.log('*** Conversation Member', conversation.me);

    // Bind to events on the conversation
    conversation.on('text', (sender, message) => {
      console.log('*** Message received', sender, message);
      const { incomingMessages } = this.state;
      const newIncomingMessage = {
        sender: sender.user.name,
        timestamp: message.timestamp,
        text: message.body.text,
      };
      this.setState({ incomingMessages: incomingMessages.concat(newIncomingMessage) });
    });
  }

  joinConversation(userToken) {
    const { conversationId } = this.props;
    new ConversationClient({ debug: false })
      .login(userToken)
      .then(app => app.getConversation(conversationId))
      .catch(error => console.error('error joining conversation', error));
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ newMessage: value });
  }

  sendMessage() {
    const { newMessage } = this.state;
    this.conversation.sendText(newMessage)
      .then(() => {
        this.setState({ newMessage: '' });
      })
      .catch(error => console.error('error sending message', error));
  }
  render() {
    return <div />;
  }
}

SpaceChatLogic.propTypes = {
  conversationId: PropTypes.string,
};

SpaceChatLogic.defaultProps = {
  conversationId: null,
};

export default SpaceChatLogic;
