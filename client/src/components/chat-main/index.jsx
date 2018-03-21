import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import MessageText from 'mdi-react/MessageTextIcon.js';
import ChatRoom from './chat-room.jsx';
import ChatNavLink from './chat-nav-link.jsx';

class ChatMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSpaceChats: {},
      currentUserNexmoId: '',
    };
    this.getAllChats = this.getAllChats.bind(this);
    this.deleteConversation = this.deleteConversation.bind(this);
  }
  componentDidMount() {
    Axios.get(`/api/spaceChats/${localStorage.getItem('id_token')}`)
      .then(response => this.setState({ userSpaceChats: response.data }, () => {
        console.log('space chats', response.data);
      }))
      .catch(error => console.error('error getting space chats', error));

    Axios.get(`/api/getNexmoId/${localStorage.getItem('id_token')}`)
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
  deleteConversation(id) {
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
      setConversation,
      usersByNexmoId,
      conversationId,
      chat,
      incomingMessages,
      typingStatus,
      chatLinkId,
      category,
      setCategory,
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
            const spacePurpose = userSpaceChats[chat.id].purpose_id;
            return (
              <ChatNavLink
                key={chat.id}
                chat={chat}
                category={spacePurpose}
                setConversation={setConversation}
                deleteConversation={this.deleteConversation}
                setCategory={setCategory}
              />
            );
          })}
          <h6 className="mt-3">Direct Messages</h6>
          {userChats.length > 0 && userChats.map((chat) => {
            return (
              <ChatNavLink
                key={chat.id}
                chat={chat}
                category="user"
                setConversation={setConversation}
                deleteConversation={this.deleteConversation}
                setCategory={setCategory}
              />
            );
          })}
        </nav>
        <ChatRoom
          chatLinkId={chatLinkId}
          chatClient={chatClient}
          conversationId={conversationId}
          chat={chat}
          incomingMessages={incomingMessages}
          typingStatus={typingStatus}
          category={category}
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
  chatLinkId: PropTypes.number,
  category: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setCategory: PropTypes.func,
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
  chatLinkId: 0,
  category: 'user',
  setCategory: null,
};

export default ChatMain;
