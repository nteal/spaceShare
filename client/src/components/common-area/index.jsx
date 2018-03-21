import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Axios from 'axios';

import CommonAreaMain from './main.jsx';
import Members from './members.jsx';
import GroundRules from './ground-rules.jsx';

class CommonArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      ownerId: 0,
      name: null,
      purpose: '',
      todos: [],
      complete: [],
      incomplete: [],
      mainImage: 'https://s3.amazonaws.com/spaceshare-sfp/spaces/space.jpg',
      members: [],
      groundRules: '',
      conversationId: '',
      chat: {},
      incomingMessages: [],
    };
    this.setTodos = this.setTodos.bind(this);
    this.submitTodos = this.submitTodos.bind(this);
    this.setSpaceInfo = this.setSpaceInfo.bind(this);
    this.setupConversationEvents = this.setupConversationEvents.bind(this);
    this.showConversationHistory = this.showConversationHistory.bind(this);
    this.joinConversation = this.joinConversation.bind(this);
    this.submitGroundRules = this.submitGroundRules.bind(this);
    this.addMember = this.addMember.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
  }
  componentDidMount() {
    console.log('common area did mount');
    this.setSpaceInfo();
  }
  setTodos(todos, callback) {
    const complete = todos.filter(todo => todo.completed);
    const incomplete = todos.filter(todo => !todo.completed);
    this.setState({ todos, complete, incomplete }, callback);
  }
  setSpaceInfo() {
    Axios.get(`/api/currentSpace/${localStorage.getItem('id_token')}/${this.props.location.state ? this.props.location.state.spaceId : localStorage.getItem('id_space')}`)
      .then((space) => {
        this.setState({
          id: space.data.id,
          ownerId: space.data.owner_fb_id,
          name: space.data.name,
          purpose: space.data.purpose,
          todos: space.data.todos || [],
          mainImage: space.data.main_image || 'https://s3.amazonaws.com/spaceshare-sfp/spaces/space.jpg',
          members: space.data.members || [],
          groundRules: space.data.ground_rules,
          conversationId: space.data.convo_id,
        }, () => {
          const { todos, conversationId, members } = this.state;
          const membersById = members.reduce((membersById, member) => {
            membersById[member.id] = member.name_first;
            return membersById;
          }, {});
          this.setState({ membersById });
          this.setTodos(todos, () => {
            console.log('common area', this.state);
          });
          this.joinConversation(localStorage.getItem('nexmo_token'));
          // Axios.get(`/api/getChat/${localStorage.getItem('id_token')}/${conversationId}`)
          //   .then(response => this.setState({ chat: response.data }))
          //   .catch(error => console.error('error getting space chat', error));
        });
      })
      .catch((error) => { console.dir(error); });
    Axios.get(`/api/isOwner/${localStorage.getItem('id_token')}/${this.props.location.state ? this.props.location.state.spaceId : localStorage.getItem('id_space')}`)
      .then((response) => {
        this.setState({ isOwner: response.data }, () => {
          console.log('isOwner', this.state.isOwner);
        });
      })
      .catch(error => console.error('error checking if current user is owner', error));
  }

  setupConversationEvents(conversation) {
    const { membersById } = this.state;
    this.conversation = conversation;
    console.log('*** Conversation Retrieved', conversation);
    console.log('*** Conversation Member', conversation.me);

    conversation.on('text', (sender, message) => {
      console.log('*** Message received', sender, message);
      const { incomingMessages, membersById } = this.state;
      const newIncomingMessage = {
        sender: membersById[sender.user.name],
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
          .then(() => console.log('text:seen'))
          .catch((error) => console.error(error));
      }
    });

    conversation.on('member:joined', member => console.log(member, 'joined'));
    conversation.on('member:left', member => console.log(member, 'left'));

    this.showConversationHistory(conversation);

    conversation.on('text:seen', (data, text) => console.log(`${membersById[data.user.name]} saw text: ${text.body.text}`));
    conversation.on('text:typing:off', data => this.setState({ typingStatus: '' }));
    conversation.on('text:typing:on', data => this.setState({ typingStatus: `${membersById[data.user.name]} is typing...` }));
  }
  showConversationHistory(conversation) {
    Axios.get(`/api/getNexmoId/${localStorage.getItem('id_token')}`)
      .then((response) => {
        const currentUserNexmoId = response.data;
        const { membersById } = this.state;
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
                    sender: membersById[chat.user.name],
                    timestamp: date,
                    text: events[Object.keys(events)[i - 1]].body.text,
                  });
                  break;
                case 'member:joined':
                  eventsHistory.unshift({
                    notMessage: true,
                    sender: membersById[chat.user.name],
                    timestamp: date,
                    text: 'is in the space! :)',
                  });
                  break;
                case 'member:left':
                  eventsHistory.unshift({
                    notMessage: true,
                    sender: membersById[chat.user.name],
                    timestamp: date,
                    text: 'left for now... :(',
                  });
                  break;
                default:
                  eventsHistory.unshift({
                    notMessage: true,
                    sender: membersById[chat.user.name],
                    timestamp: date,
                    text: 'did something weird...',
                  });
              }
            }
          }
          this.setState({ incomingMessages: this.state.incomingMessages.concat(eventsHistory) });
        });
      })
      .catch(error => console.error('error getting current user nexmo id', error));
  }
  joinConversation(userToken) {
    const { chatClient } = this.props;
    const { conversationId } = this.state;
    chatClient
      .login(userToken)
      .then(app => app.getConversation(conversationId))
      .then((conversation) => {
        this.setState({ chat: conversation }, () => {
          if (!conversation.me || conversation.me.state !== 'JOINED') {
            conversation.join();
          }
          this.setupConversationEvents(conversation);
        });
      })
      .catch(error => console.error('error joining conversation', error));
  }
  submitTodos() {
    const { id, todos } = this.state;
    Axios.post(`/api/updateTodos/${localStorage.getItem('id_token')}/${id}`, todos)
      .then((response) => {
        console.log('todos updated', response.data);
        this.setTodos(response.data, () => {
          console.log(this.state);
        });
      })
      .catch(error => console.error('error updating todos', error));
  }
  addMember(fbId) {
    const { id } = this.state;
    const updateObj = { fbId, spaceId: id };

    Axios.post(`/api/addMember/${localStorage.getItem('id_token')}`, updateObj)
      .then((response) => {
        console.log('member added', response.data);
        this.setSpaceInfo();
      })
      .catch(error => console.error('error adding member', error));
  }
  deleteMember(userId) {
    const { id } = this.state;
    const updateObj = { userId, spaceId: id };

    Axios.post(`/api/deleteMember/${localStorage.getItem('id_token')}`, updateObj)
      .then((response) => {
        console.log('member deleted', response.data);
        this.setSpaceInfo();
      })
      .catch(error => console.error('error deleting member', error));
  }
  submitGroundRules(field, newRules) {
    this.setState({ groundRules: newRules }, () => {
      const { id, groundRules } = this.state;
      const updateObj = { spaceId: id, ground_rules: groundRules };

      Axios.post(`/api/updateGroundRules/${localStorage.getItem('id_token')}`, updateObj)
        .then(response => console.log('ground rules updated!', response))
        .catch(error => console.error('error updating ground rules', error));
    });
  }
  render() {
    const { startNewChat } = this.props;
    const {
      id,
      ownerId,
      name,
      purpose,
      todos,
      complete,
      incomplete,
      members,
      groundRules,
      isOwner,
      conversationId,
      chat,
      incomingMessages,
      typingStatus,
    } = this.state;
    const commonAreaProps = {
      id,
      name,
      purpose,
      todos,
      complete,
      incomplete,
      isOwner,
      members,
      conversationId,
      chat,
      setTodos: this.setTodos,
      submitTodos: this.submitTodos,
      incomingMessages,
      typingStatus,
    };
    const membersProps = {
      ownerId,
      members,
      addMember: this.addMember,
      deleteMember: this.deleteMember,
      isOwner,
      startNewChat,
    };
    const rulesProps = { groundRules, submit: this.submitGroundRules, isOwner };

    return (
      <div>

        <div className="row justify-content-around">
          <div className="space-main-img-container">
            <img
              className="img-fluid space-main-img"
              src={this.state.mainImage}
              alt="Your lovely space"
            />
          </div>
        </div>

        <Switch>
          <Route
            exact
            path="/common-area"
            render={props => (
              <CommonAreaMain {...props} {...commonAreaProps} />
            )}
          />
          <Route
            path="/common-area/members"
            render={props => (
              <Members {...props} {...membersProps} />
            )}
          />
          <Route
            path="/common-area/ground-rules" 
            render={props => (
              <GroundRules {...props} {...rulesProps} />
            )}
          />
        </Switch>

      </div>
    );
  }
}

CommonArea.propTypes = {
  chatClient: PropTypes.object,
  startNewChat: PropTypes.func,
};

CommonArea.defaultProps = {
  chatClient: null,
  startNewChat: null,
};

export default CommonArea;
