import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Axios from 'axios';
import MediaQuery from 'react-responsive';
import Sidebar from 'react-sidebar';

import Login from '../login/index.jsx';
import Dashboard from '../dashboard/index.jsx';
import EditProfile from '../profile/editProfile.jsx';
import Profile from '../profile/index.jsx';
import CommonArea from '../common-area/index.jsx';
import ChatMain from '../chat-main/index.jsx';
import CreateSpace from '../create-a-space/index.jsx';
import Listing from '../listing/index.jsx';
import EditListing from '../listing/editListing.jsx';
import Search from '../search/index.jsx';
import SideNavItems from './side-nav.jsx';
import Header from './header.jsx';
import Logo from '../../assets/ss-logo-transparent.png';
import AllListings from '../all-listings/index.jsx';
import SearchResults from '../search-results/index.jsx';
import PastSearches from '../past-searches/index.jsx';

const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8,
  },
  content: {
    fontFamily: 'Raleway',
  },
};

const mql = window.matchMedia('(min-width: 800px)');

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true,
      mql: mql,
      docked: props.docked,
      open: props.open,
      transitions: true,
      touch: true,
      refresh: false,
      allUserChats: {},
      incomingMessages: [],
      typingStatus: '',
      category: '',
      newEvents: [],
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.getAllChats = this.getAllChats.bind(this);
    this.getNewChatEvents = this.getNewChatEvents.bind(this);
    this.getAllMemberNames = this.getAllMemberNames.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.setConversation = this.setConversation.bind(this);
    this.setupConversationEvents = this.setupConversationEvents.bind(this);
    this.showConversationHistory = this.showConversationHistory.bind(this);
    this.joinConversation = this.joinConversation.bind(this);
    this.startNewChat = this.startNewChat.bind(this);
    this.fbLogout = this.fbLogout.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.toggleRefresh = this.toggleRefresh.bind(this);
  }
  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, sidebarDocked: mql.matches});

    Axios.get(`/auth/isAuthenticated/${localStorage.getItem('id_token')}`)
      .then((response) => {
        if (response.data === false) {
          this.setState({ isAuthenticated: false });
        } else {
          this.getAllChats();
        }
      })
      .catch(error => console.error('error checking authentication', error));
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  getAllChats(callback) {
    const { chatClient } = this.props;
    chatClient.login(localStorage.getItem('nexmo_token'))
      .then((app) => {
        this.app = app;
        console.log('*** logged into app', app);
        this.setState({ chatApp: app });
        app.on('member:invited', (member, event) => {
          console.log('*** invitation received:', event);
        });
        return app.getConversations();
      })
      .then((conversations) => {
        console.log('*** Retrieved conversations', conversations);
        this.setState({ allUserChats: conversations }, callback);
      })
      .catch(error => console.error('error logging into nexmo', error));
    Axios.get(`/api/spaceChats/${localStorage.getItem('id_token')}`)
      .then(response => this.setState({ userSpaceChats: response.data }, () => {
        console.log('space chats', response.data);
      }))
      .catch(error => console.error('error getting space chats', error));
  }
  getNewChatEvents() {
    const { allUserChats, chatApp } = this.state;
    if (!chatApp) {
      this.getAllChats(() => {
        const { chatApp, allUserChats } = this.state;
        chatApp.on('member:invited', (member, event) => {
          const newInvite = {
            event: 'invite',
            user: member.invited_by,
            conversationId: event.conversation.id,
          };
          this.setState({ newEvents: this.state.newEvents.concat(newInvite) }, () => {
            console.log('new events', this.state.newEvents);
          });
        });
        const otherInvites = Object.keys(allUserChats)
          .filter(chat => allUserChats[chat].me.state === 'INVITED')
          .map(chat => allUserChats[chat])
          .map((chat) => {
            const newInvite = {
              event: 'invite',
              user: chat.display_name,
              conversationId: chat.id,
            };
            return newInvite;
          });
        this.setState({ newEvents: this.state.newEvents.concat(otherInvites) });
      });
    } else {
      chatApp.on('member:invited', (member, event) => {
        const newInvite = {
          event: 'invite',
          user: member.invited_by,
          conversationId: event.conversation.id,
        };
        this.setState({ newEvents: this.state.newEvents.concat(newInvite) }, () => {
          console.log('new events', this.state.newEvents);
        });
      });
      const otherInvites = Object.keys(allUserChats)
        .filter(chat => allUserChats[chat].me.state === 'INVITED')
        .map(chat => allUserChats[chat])
        .map((chat) => {
          const newInvite = {
            event: 'invite',
            user: chat.display_name,
            conversationId: chat.id,
          };
          return newInvite;
        });
      this.setState({ newEvents: this.state.newEvents.concat(otherInvites) });
    }
  }

  setConversation(id) {
    this.setState({
      conversationId: id,
      incomingMessages: [],
    }, () => {
      console.log('convo set', id);
      this.joinConversation(localStorage.getItem('nexmo_token'));
    });
  }
  getAllMemberNames(callback) {
    const { allUserChats } = this.state;

    const uniqueIds = Object.keys(allUserChats).reduce((idObj, chat) => {
      const { members } = allUserChats[chat];
      Object.keys(members).forEach((memberId) => {
        const member = members[memberId];
        idObj[member.user.id] = true;
      });
      return idObj;
    }, {});
    const nexmoIds = Object.keys(uniqueIds);
    Axios.get(`/chat/usersByNexmoId/${localStorage.getItem('id_token')}`, {
      params: { nexmoIds },
    })
      .then(response => this.setState({ usersByNexmoId: response.data }, callback))
      .catch(error => console.error('error getting users by nexmo id', error));
  }
  setupConversationEvents(conversation) {
    const { usersByNexmoId } = this.state;
    this.conversation = conversation;
    console.log('*** Conversation Retrieved', conversation);
    console.log('*** Conversation Member', conversation.me);

    conversation.on('text', (sender, message) => {
      console.log('*** Message received', sender, message);
      const { usersByNexmoId, incomingMessages } = this.state;
      const newIncomingMessage = {
        sender: usersByNexmoId[sender.user.id].name_first,
        timestamp: message.timestamp,
        text: message.body.text,
      };
      if (sender.name === this.conversation.me.name) {
        newIncomingMessage.isMe = true;
      }
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
  setCategory(category) {
    this.setState({ category }, () => {
      const {
        allUserChats,
        conversationId,
        currentUserNexmoId,
        usersByNexmoId,
        userSpaceChats,
      } = this.state;

      let id;
      if (category === 'user') {
        const chat = allUserChats[conversationId];
        const notMeMemberId = chat.members && Object.keys(chat.members)
          .filter(id => chat.members[id].user.id !== currentUserNexmoId)[0];
        const notMe = chat.members[notMeMemberId].user.id;
        id = usersByNexmoId[notMe].id;
        const displayName = `${usersByNexmoId[notMe].name_first} ${usersByNexmoId[notMe].name_last}`;
        this.setState({ displayName });
      } else {
        id = userSpaceChats[conversationId].id;
      }
      this.setState({ chatLinkId: id });
    });
  }
  startNewChat(userNexmoId) {
    Axios.get(`/api/currentUser/${localStorage.getItem('id_token')}`)
      .then((response) => {
        const userNameFirst = response.data.name_first;
        const userNameLast = response.data.name_last;
        const { chatApp } = this.state;
        if (!chatApp) {
          this.getAllChats(() => {
            chatApp.newConversationAndJoin({
              display_name: `${userNameFirst} ${userNameLast}`,
            })
              .then((conversation) => {
                conversation
                  .invite({ id: userNexmoId })
                  .then((user) => {
                    console.log('invited', user);
                    this.setConversation(user.conversation.id);
                  })
                  .catch(error => console.error('error inviting user to chat', error));
              })
              .catch(error => console.error('error creating new chat', error));
          });
        } else {
          chatApp.newConversationAndJoin({
            display_name: `${userNameFirst} ${userNameLast}`,
          })
            .then((conversation) => {
              this.setConversation(conversation.id);
              conversation
                .invite({ id: userNexmoId })
                .then(user => console.log('invited', user))
                .catch(error => console.error('error inviting user to chat', error));
            })
            .catch(error => console.error('error creating new chat', error));
        }
      })
      .catch(error => console.error('error getting current user info', error));
  }
  showConversationHistory(conversation) {
    Axios.get(`/chat/getNexmoId/${localStorage.getItem('id_token')}`)
      .then((response) => {
        const currentUserNexmoId = response.data;
        this.setState({ currentUserNexmoId });
        const { usersByNexmoId, incomingMessages } = this.state;
        conversation.getEvents().then((events) => {
          const eventsHistory = [];
          for (let i = Object.keys(events).length; i > 0; i--) {
            const date = events[Object.keys(events)[i - 1]].timestamp;
            const chat = conversation.members[events[Object.keys(events)[i - 1]].from];
            if (chat) {
              switch (events[Object.keys(events)[i - 1]].type) {
                case 'text':
                  eventsHistory.unshift({
                    isMe: chat.user.id === currentUserNexmoId,
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
                    text: 'joined the chat!',
                  });
                  break;
                case 'member:left':
                  eventsHistory.unshift({
                    notMessage: true,
                    sender: usersByNexmoId[chat.user.id].name_first,
                    timestamp: date,
                    text: 'left for now...',
                  });
                  break;
                default:
                  eventsHistory.unshift({
                    notMessage: true,
                    sender: null,
                    timestamp: null,
                    text: null,
                  });
              }
            }
          }
          this.setState({ incomingMessages: incomingMessages.concat(eventsHistory) });
        });
      })
      .catch(error => console.error('error getting current user nexmo id', error));
  }
  joinConversation(userToken) {
    const { chatApp } = this.state;
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

  fbLogout() {
    const { chatClient } = this.state;
    console.log('logging out!');
    localStorage.removeItem('id_token');
    localStorage.removeItem('nexmo_token');
    chatClient.logout();
    this.setState({
      isAuthenticated: false,
    });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: this.state.mql.matches });
  }

  toggleOpen(event) {
    console.log('toggled');
    this.setState({ open: !this.state.open });
    if (event) {
      event.preventDefault();
    }
  }

  toggleRefresh() {
    this.setState({ refresh: !this.state.refresh });
  }

  render() {
    const {
      isAuthenticated,
      allUserChats,
      chatApp,
      usersByNexmoId,
      conversationId,
      chat,
      incomingMessages,
      typingStatus,
      chatLinkId,
      category,
      displayName,
      newEvents,
    } = this.state;
    const { chatClient } = this.props;

    const sidebar = <SideNavItems toggleOpen={this.toggleOpen} />;

    const contentHeader = (
      <span className="pr-2">
        <MediaQuery minDeviceWidth={800}>
          <Link to="/">
            <span>SpaceShare</span>
          </Link>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={799}>
          <Link to="/">
            <img src={Logo} className="mobile-logo" alt="SpaceShare logo" />
          </Link>
        </MediaQuery>
      </span>
    );

    const hamburger = (
      <span className="pl-0 pr-2">
        {!this.state.docked &&
        <a onClick={this.toggleOpen} href="#" style={styles.contentHeaderMenuLink}>
          <i className="material-icons">menu</i>
        </a>}
      </span>
    );

    const contentHeaderMobile = (
      <span>
        <Link to="/">
          <img src={Logo} className="mobile-logo" alt="SpaceShare logo" />
        </Link>
      </span>
    );

    const sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      open: this.state.open,
      touch: this.state.touch,
      transitions: this.state.transitions,
      onSetOpen: this.onSetSidebarOpen,
    };

    const commonAreaProps = {
      chatClient,
      key: this.state.refresh,
      startNewChat: this.startNewChat,
    };

    const profileProps = {
      startNewChat: this.startNewChat,
    };

    const dashboardProps = {
      chatClient,
      chatApp,
      allUserChats,
      newEvents,
      setConversation: this.setConversation,
      getAllChats: this.getAllChats,
      getNewChatEvents: this.getNewChatEvents,
    };
    
    const chatProps = {
      chatClient,
      chatApp,
      allUserChats,
      getAllChats: this.getAllChats,
      getAllMemberNames: this.getAllMemberNames,
      setConversation: this.setConversation,
      usersByNexmoId,
      conversationId,
      chat,
      incomingMessages,
      typingStatus,
      chatLinkId,
      category,
      setCategory: this.setCategory,
      displayName,
    };

    const refreshKeyProp = {
      key: this.state.refresh,
    };

    const toggleRefreshProp = {
      toggleRefresh: this.toggleRefresh,
    };

    if (isAuthenticated) {
      return (
        <Sidebar {...sidebarProps}>
          <Header hamburger={hamburger} title={contentHeader} mobileTitle={contentHeaderMobile} logout={this.fbLogout}>
            <div style={styles.content}>
              <Route exact path="/" render={() => isAuthenticated && <Redirect to="/dashboard" />} />
              <Switch>
                <Route path="/dashboard" render={props => <Dashboard {...props} {...refreshKeyProp} {...dashboardProps} />} />
                <Route path="/edit-profile" render={props => <EditProfile {...props} {...toggleRefreshProp} />} />
                <Route path="/profile" render={props => <Profile {...props} {...profileProps} />} />
                <Route path="/common-area" render={props => <CommonArea {...props} {...commonAreaProps} />} />
                <Route path="/messages" render={props => <ChatMain {...props} {...chatProps} />} />
                <Route path="/new-space" render={props => <CreateSpace {...props} {...toggleRefreshProp} />} />
                <Route path="/listing" render={props => <Listing {...props} {...profileProps} />} />
                <Route path="/edit-listing" render={props => <EditListing {...props} />} />
                <Route path="/edit-space" component={CreateSpace} />
                <Route path="/search" component={Search} />
                <Route path="/search-results" component={SearchResults} />
                <Route path="/listings" component={AllListings} />
                <Route path="/saved-searches" component={PastSearches} />
              </Switch>
            </div>
          </Header>
        </Sidebar>
      );
    }
    return <Login />;
  }
}

Nav.propTypes = {
  chatClient: PropTypes.object,
};

Nav.defaultProps = {
  chatClient: new ConversationClient(),
};

export default Nav;
