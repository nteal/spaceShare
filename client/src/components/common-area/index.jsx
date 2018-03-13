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
      mainImage: 'https://s3.amazonaws.com/spaceshare-sfp/spaces/space.jpg',
      members: [],
      groundRules: '',
    };
  }
  componentDidMount() {
    console.log('common area did mount');
    Axios.get('/api/currentSpace', {
      params: {
        spaceId: this.props.location.state ? this.props.location.state.spaceId : localStorage.getItem('id_space'),
        token: localStorage.getItem('id_token'),
      },
    })
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
        });
      })
      .catch((error) => { console.dir(error); });
  }
  render() {
    console.dir(this.state);
    const {
      id,
      ownerId,
      name,
      purpose,
      todos,
      members,
      groundRules,
    } = this.state;
    const commonAreaProps = { id, name, purpose, todos };
    const membersProps = { ownerId, members };
    const rulesProps = { groundRules };

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
