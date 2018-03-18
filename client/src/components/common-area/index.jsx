import React from 'react';
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
      console.log('incoming', newIncomingMessage);
      this.setState({
        incomingMessages: incomingMessages.concat(newIncomingMessage),
      });
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

    conversation.on('text:seen', (data, text) => console.log(`${data.name} saw text: ${text.body.text}`));
    conversation.on('text:typing:off', data => console.log(`${data.name} stopped typing...`));
    conversation.on('text:typing:on', data => console.log(`${data.name} started typing...`));
  }
  showConversationHistory(conversation) {
    conversation.getEvents().then((events) => {
      let eventsHistory = '';
      for (let i = Object.keys(events).length; i > 0; i--) {
        const date = new Date(Date.parse(events[Object.keys(events)[i - 1]].timestamp));
        if (conversation.members[events[Object.keys(events)[i - 1]].from]) {
          switch (events[Object.keys(events)[i - 1]].type) {
            case 'text':
              eventsHistory += `${conversation.members[events[Object.keys(events)[i - 1]].from].user.name} @ ${date}: <b>${events[Object.keys(events)[i - 1]].body.text}</b><br>`
              console.log('+++', eventsHistory);
              break;

            case 'member:media':
              eventsHistory += `${conversation.members[events[Object.keys(events)[i - 1]].from].user.name} @ ${date}: <b>${events[Object.keys(events)[i - 1]].body.audio ? "enabled" : "disabled"} audio</b><br>`
              console.log('+++', eventsHistory);
              break;

            case 'member:joined':
              eventsHistory += `${conversation.members[events[Object.keys(events)[i - 1]].from].user.name} @ ${date}: <b>joined the conversation</b><br>`;
              console.log('+++', eventsHistory);
              break;
            case 'member:left':
              eventsHistory += `${conversation.members[events[Object.keys(events)[i - 1]].from].user.name} @ ${date}: <b>left the conversation</b><br>`;
              console.log('+++', eventsHistory);
              break;
            case 'member:invited':
              eventsHistory += `${conversation.members[events[Object.keys(events)[i - 1]].from].user.name} @ ${date}: <b>invited to the conversation</b><br>`;
              console.log('+++', eventsHistory);
              break;

            default:
              eventsHistory += `${conversation.members[events[Object.keys(events)[i - 1]].from].user.name} @ ${date}: <b>unknown event</b><br>`;
              console.log('+++', eventsHistory);
          }
        }
      }
      this.setState({ chatHistory: eventsHistory });
    });
  }
  joinConversation(userToken) {
    const { conversationId } = this.state;
    new ConversationClient({ debug: false })
      .login(userToken)
      .then(app => app.getConversation(conversationId))
      .then((conversation) => {
        this.setState({ chat: conversation }, () => {
          console.log('chat', conversation);
          conversation.join();
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
    };
    const membersProps = {
      ownerId,
      members,
      addMember: this.addMember,
      deleteMember: this.deleteMember,
      isOwner,
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

export default CommonArea;
