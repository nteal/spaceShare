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
    this.getAllChats = this.getAllChats.bind(this);
    this.getAllMemberNames = this.getAllMemberNames.bind(this);
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
      if (chat && chat.members) {
        Object.keys(chat.members).forEach(memberId => idObj[memberId] = true);
      }
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
    const chatProps = { chatClient };

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
            <Link
              key={chat.id}
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
          {userChats.length > 0 && userChats.map((chat) => {
            const messagePartner = Object.keys(chat.members)
              .filter(nexmoId => nexmoId !== currentUserNexmoId)[0];
            const name = usersByNexmoId[messagePartner] ?
              `${usersByNexmoId[messagePartner].name_first} ${usersByNexmoId[messagePartner].name_last}` :
              'Unknown';
            const convoId = chat.id;
            return (
              <Link
                chat={chat.id}
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
