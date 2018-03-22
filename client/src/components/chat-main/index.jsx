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
      currentUserNexmoId: '',
    };
    this.getAllChats = this.getAllChats.bind(this);
    // this.getAllMemberNames = this.getAllMemberNames.bind(this);
    this.setConversation = this.setConversation.bind(this);
    // this.setupConversationEvents = this.setupConversationEvents.bind(this);
    // this.showConversationHistory = this.showConversationHistory.bind(this);
    // this.joinConversation = this.joinConversation.bind(this);
    this.deleteConversation = this.deleteConversation.bind(this);
  }
  componentDidMount() {
    Axios.get(`/chat/spaceChats/${localStorage.getItem('id_token')}`)
      .then(response => this.setState({ userSpaceChats: response.data }))
      .catch(error => console.error('error getting space chats', error));

    Axios.get(`/chat/getNexmoId/${localStorage.getItem('id_token')}`)
      .then(response => this.setState({ currentUserNexmoId: response.data }, () => {
        const { allUserChats, getAllMemberNames } = this.props;
        if (!allUserChats) {
          this.getAllChats();
        } else {
          getAllMemberNames();
        }
      }))
      .catch(error => console.error('error getting nexmo id', error));
  }
  getAllChats() {
    const { getAllChats, allUserChats, getAllMemberNames } = this.props;
    getAllChats(() => {
      console.log('all chats gotten', allUserChats);
      getAllMemberNames();
    });
  }
  setConversation(event) {
    const { id } = event.target;
    const { setConversation } = this.props;
    setConversation(id);
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
    const {
      allUserChats,
      chatClient,
      usersByNexmoId,
      conversationId,
      chat,
      incomingMessages,
      typingStatus,
    } = this.props;
    const {
      userSpaceChats,
      currentUserNexmoId,
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
          {spaceChats.map((chat) => {
            console.log(userSpaceChats);
            const spacePurpose = userSpaceChats[chat.id].purpose;
            const glyph = spacePurpose === 1 ? (
              <i className="material-icons md-xs mr-1">business</i>
            ) : (
              <i className="material-icons md-xs mr-1">home</i>
            );
            return (
              <div key={chat.id} className="row d-flex align-items-center pl-3">
                {glyph}
                <a
                  id={chat.id}
                  className="nav-link pl-1 pt-1 pb-1"
                  href="#"
                  onClick={this.setConversation}
                >
                  {chat.display_name}
                </a>
              </div>
            );
          })}
          <h6 className="mt-3">Direct Messages</h6>
          {userChats.length > 0 && userChats.map((chat) => {
            console.log('user chat', chat);
            return (
              <div key={chat.id} className="row d-flex align-items-center justify-content-between pl-2 pr-4">
                <a
                  id={chat.id}
                  className="nav-link pt-1 pb-1"
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
  getAllMemberNames: PropTypes.func,
  setConversation: PropTypes.func,
  allUserChats: PropTypes.object,
  chatClient: PropTypes.object,
  usersByNexmoId: PropTypes.object,
  conversationId: PropTypes.string,
  chat: PropTypes.object,
  incomingMessages: PropTypes.array,
  typingStatus: PropTypes.string,
};

ChatMain.defaultProps = {
  getAllChats: null,
  getAllMemberNames: null,
  setConversation: null,
  allUserChats: {},
  chatClient: null,
  usersByNexmoId: {},
  conversationId: '',
  chat: {},
  incomingMessages: [],
  typingStatus: '',
};

export default ChatMain;
