import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Axios from 'axios';
import MessageText from 'mdi-react/MessageTextIcon.js';
import CloseCircleOutline from 'mdi-react/CloseCircleOutlineIcon.js';
import ChatRoom from './chat-room.jsx';

class ChatMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSpaceChats: {},
      usersByNexmoId: {},
      currentUserNexmoId: '',
      conversationId: '',
      incomingMessages: [],
      typingStatus: '',
    };
    this.getAllChats = this.getAllChats.bind(this);
    this.getAllMemberNames = this.getAllMemberNames.bind(this);
    this.setConversation = this.setConversation.bind(this);
    this.setupConversationEvents = this.setupConversationEvents.bind(this);
    this.showConversationHistory = this.showConversationHistory.bind(this);
    this.joinConversation = this.joinConversation.bind(this);
    this.deleteConversation = this.deleteConversation.bind(this);
  }
  componentDidMount() {
    Axios.get(`/api/spaceChats/${localStorage.getItem('id_token')}`)
      .then(response => this.setState({ userSpaceChats: response.data }))
      .catch(error => console.error('error getting space chats', error));

    Axios.get(`/api/getNexmoId/${localStorage.getItem('id_token')}`)
      .then(response => this.setState({ currentUserNexmoId: response.data }, () => {
        const { allUserChats } = this.props;
        if (!allUserChats) {
          this.getAllChats();
        } else {
          this.getAllMemberNames();
        }
      }))
      .catch(error => console.error('error getting nexmo id', error));
  }
  getAllChats() {
    const { getAllChats, allUserChats } = this.props;
    getAllChats(() => {
      console.log('all chats gotten', allUserChats);
      this.getAllMemberNames();
    });
  }
  getAllMemberNames() {
    const { allUserChats } = this.props;

    const uniqueIds = Object.keys(allUserChats).reduce((idObj, chat) => {
      const { members } = allUserChats[chat];
      Object.keys(members).forEach((memberId) => {
        const member = members[memberId];
        idObj[member.user.id] = true;
      });
      return idObj;
    }, {});
    const nexmoIds = Object.keys(uniqueIds);
    Axios.get(`/api/usersByNexmoId/${localStorage.getItem('id_token')}`, {
      params: { nexmoIds },
    })
      .then(response => this.setState({ usersByNexmoId: response.data }))
      .catch(error => console.error('error getting users by nexmo id', error));
  }
  setConversation(event) {
    const { id } = event.target;
    this.setState({
      conversationId: id,
      incomingMessages: [],
    }, () => {
      this.joinConversation(localStorage.getItem('nexmo_token'));
    });
  }
  setupConversationEvents(conversation) {
    const { usersByNexmoId } = this.state;
    this.conversation = conversation;
    console.log('*** Conversation Retrieved', conversation);
    console.log('*** Conversation Member', conversation.me);

    conversation.on('text', (sender, message) => {
      console.log('*** Message received', sender, message);
      const { incomingMessages } = this.state;
      const newIncomingMessage = {
        sender: usersByNexmoId[sender.user.id].name_first,
        timestamp: message.timestamp,
        text: message.body.text,
      };
      if (newIncomingMessage.timestamp !== incomingMessages[incomingMessages.length - 1].timestamp) {
        this.setState({
          incomingMessages: incomingMessages.concat(newIncomingMessage),
        });
      }
      if (sender.name !== this.conversation.me.name) {
        message
          .seen()
          .then(this.eventLogger('text:seen'))
          .catch(this.errorLogger);
      }
    });

    conversation.on('member:joined', member => console.log(member, 'joined'));
    conversation.on('member:left', member => console.log(member, 'left'));

    this.showConversationHistory(conversation);

    conversation.on('text:seen', (data, text) => console.log(`${usersByNexmoId[data.user.id].name_first} saw text: ${text.body.text}`));
    conversation.on('text:typing:off', data => this.setState({ typingStatus: '' }));
    conversation.on('text:typing:on', data => this.setState({ typingStatus: `${usersByNexmoId[data.user.id].name_first} is typing...` }));
  }
  showConversationHistory(conversation) {
    const { usersByNexmoId } = this.state;
    conversation.getEvents().then((events) => {
      const eventsHistory = [];
      for (let i = Object.keys(events).length; i > 0; i--) {
        const date = events[Object.keys(events)[i - 1]].timestamp;
        const chat = conversation.members[events[Object.keys(events)[i - 1]].from];
        if (chat) {
          switch (events[Object.keys(events)[i - 1]].type) {
            case 'text':
              eventsHistory.unshift({
                sender: usersByNexmoId[chat.user.id].name_first,
                timestamp: date,
                text: events[Object.keys(events)[i - 1]].body.text,
              });
              break;
            case 'member:joined':
              eventsHistory.unshift({
                notMessage: true,
                sender: usersByNexmoId[chat.user.id].name_first,
                timestamp: date,
                text: 'is in the space! :)',
              });
              break;
            case 'member:left':
              eventsHistory.unshift({
                notMessage: true,
                sender: usersByNexmoId[chat.user.id].name_first,
                timestamp: date,
                text: 'left for now... :(',
              });
              break;
            default:
              eventsHistory.unshift({
                notMessage: true,
                sender: usersByNexmoId[chat.user.id].name_first,
                timestamp: date,
                text: 'did something weird...',
              });
          }
        }
      }
      this.setState({ incomingMessages: this.state.incomingMessages.concat(eventsHistory) });
    });
  }
  joinConversation(userToken) {
    const { chatApp } = this.props;
    const { conversationId } = this.state;
    chatApp.getConversation(conversationId)
      .then((conversation) => {
        this.setState({ chat: conversation }, () => {
          if (conversation.me.state !== 'JOINED') {
            conversation.join();
          }
          this.setupConversationEvents(conversation);
        });
      })
      .catch(error => console.error('error joining conversation', error));
  }
  deleteConversation(event) {
    const { id } = event.target;
    console.log('convo id', id);
    const { chatApp } = this.props;
    chatApp.getConversation(id)
      .then((conversation) => {
        conversation.del()
          .then(() => {
            console.log('conversation deleted');
            this.getAllChats();
          })
          .catch(error => console.error('error deleting conversation', error));
      })
      .catch(error => console.error('error getting conversation', error));
  }
  render() {
    const { allUserChats, chatClient } = this.props;
    const {
      userSpaceChats,
      currentUserNexmoId,
      usersByNexmoId,
      conversationId,
      chat,
      incomingMessages,
      typingStatus,
    } = this.state;
    const spaceChats = allUserChats ?
      Object.keys(allUserChats)
        .filter(chatId => !!userSpaceChats[chatId])
        .map(chatId => allUserChats[chatId]) :
      [];
    const userChats = allUserChats ?
      Object.keys(allUserChats)
        .filter(chatId => !userSpaceChats[chatId])
        .map(chatId => allUserChats[chatId]) :
      [];

    return (
      <div className="wrapper">
        {/* side nav listing all user's chats */}
        <nav className="chat-nav pt-4 pl-3">
          <div className="flex-row d-flex align-items-center pb-3">
            <MessageText className="mr-3" height={30} width={30} fill="#FFF" />
            <h4 className="mb-0">
              Chats
            </h4>
          </div>
          <h6>Space Chats</h6>
          {spaceChats.map(chat => (
            <a
              key={chat.id}
              id={chat.id}
              className="nav-link"
              href="#"
              onClick={this.setConversation}
            >
              {chat.display_name}
            </a>
          ))}
          <h6 className="mt-3">Direct Messages</h6>
          {userChats.length > 0 && userChats.map((chat) => {
            console.log('user chat', chat);
            return (
              <div key={chat.id} className="row d-flex align-items-center justify-content-between pl-2 pr-4">
                <a
                  id={chat.id}
                  className="nav-link"
                  href="#"
                  onClick={this.setConversation}
                >
                  {chat.display_name}
                </a>
                <CloseCircleOutline id={chat.id} className="mdi-btn-alt" onClick={this.deleteConversation} height={18} width={18} fill="#FFF" />
              </div>
            );
          })}
        </nav>
        <ChatRoom
          chatClient={chatClient}
          conversationId={conversationId}
          chat={chat}
          incomingMessages={incomingMessages}
          typingStatus={typingStatus}
        />
      </div>
    );
  }
}

ChatMain.propTypes = {
  getAllChats: PropTypes.func,
  allUserChats: PropTypes.object,
  chatClient: PropTypes.object,
};

ChatMain.defaultProps = {
  getAllChats: null,
  allUserChats: {},
  chatClient: null,
};

export default ChatMain;
