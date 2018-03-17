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
    };
    this.setTodos = this.setTodos.bind(this);
    this.submitTodos = this.submitTodos.bind(this);
    this.setSpaceInfo = this.setSpaceInfo.bind(this);
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
          const { todos, conversationId } = this.state;
          this.setTodos(todos, () => {
            console.log('common area', this.state);
          });
          Axios.get(`/api/getChat/${localStorage.getItem('id_token')}/${conversationId}`)
            .then(response => this.setState({ chat: response.data }))
            .catch(error => console.error('error getting space chat', error));
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
    } = this.state;
    const commonAreaProps = {
      id,
      name,
      purpose,
      todos,
      complete,
      incomplete,
      isOwner,
      conversationId,
      chat,
      setTodos: this.setTodos,
      submitTodos: this.submitTodos,
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
