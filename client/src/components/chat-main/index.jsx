import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Axios from 'axios';
import MessageText from 'mdi-react/MessageTextIcon.js';
import ChatRoom from './chat-room.jsx';

class ChatMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSpaceChats: {},
      usersByNexmoId: {},
      currentUserNexmoId: '',
    };
    this.getAllConversations = this.getAllConversations.bind();
  }
  componentDidMount() {
    Axios.get(`/api/spaceChats/${localStorage.getItem('id_token')}`)
      .then(response => this.setState({ userSpaceChats: response.data }))
      .catch(error => console.error('error getting space chats', error));

    Axios.get(`/api/getNexmoId/${localStorage.getItem('id_token')}`)
      .then(response => this.setState({ currentUserNexmoId: response.data }, () => {
        this.getAllMemberNames();
      }))
      .catch(error => console.error('error getting nexmo id', error));
  }
  getAllMemberNames() {
    const { allUserChats } = this.props;
    const uniqueIds = Object.keys(allUserChats).reduce((idObj, chat) => {
      Object.keys(chat.members).forEach(memberId => idObj[memberId] = true);
      return idObj;
    }, {});
    const nexmoIds = Object.keys(uniqueIds);
    Axios.get(`/api/usersByNexmoId/${localStorage.getItem('id_token')}`, {
      params: { nexmoIds },
    })
      .then(response => this.setState({ usersByNexmoId: response.data }))
      .catch(error => console.error('error getting users by nexmo id', error));
  }
  render() {
    const { allUserChats, chatClient } = this.props;
    const { userSpaceChats, currentUserNexmoId, usersByNexmoId } = this.state;
    const spaceChats = Object.keys(allUserChats)
      .filter(chatId => !!userSpaceChats[chatId])
      .map(chatId => allUserChats[chatId]);
    const userChats = Object.keys(allUserChats)
      .filter(chatId => !userSpaceChats[chatId])
      .map(chatId => allUserChats[chatId]);
    const chatProps = { chatClient };

    return (
      <div>
        {/* side nav listing all user's chats */}
        <nav className="nav flex-column">
          <h4 className="mb-3">
            <MessageText className="mr-3" height={30} width={30} fill="#FFF" />
            Chats
          </h4>
          <h6>Space Chats</h6>
          {spaceChats.map(chat => (
            <Link
              className="nav-link"
              to={{
                pathname: '/messages/chat',
                state: { convoId: chat.id },
              }}
            >
              {chat.display_name}
            </Link>
          ))}
          <h6 className="mt-3">Direct Messages</h6>
          {userChats.map((chat) => {
            const messagePartner = Object.keys(chat.members)
              .filter(nexmoId => nexmoId !== currentUserNexmoId)[0];
            const name = `${usersByNexmoId[messagePartner].name_first} ${usersByNexmoId[messagePartner].name_last}`;
            const convoId = chat.id;
            return (
              <Link
                className="nav-link"
                to={{
                  pathname: '/messages/chat',
                  state: { convoId },
                }}
              >
                {name}
              </Link>
            );
          })}
        </nav>
        <Route
          path="/messages/chat"
          render={props => (
            <ChatRoom {...props} {...chatProps} />
          )}
        />
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
