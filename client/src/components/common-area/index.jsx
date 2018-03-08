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
      name: null,
      todos: [],
      mainImage: 'https://kaggle2.blob.core.windows.net/competitions/kaggle/5407/media/housesbanner.png',
      members: [],
      groundRules: '',
    };
  }
  componentDidMount() {
    console.log('common area did mount');
    Axios.get('http://localhost:3003/currentSpace/', {
      params: { spaceId: this.props.location.state.spaceId },
    })
      .then((space) => {
        this.setState({
          id: space.data.id,
          name: space.data.name,
          todos: space.data.todos,
          mainImage: space.data.main_image,
          members: space.data.members,
          groundRules: space.data.groundRules,
        });
      })
      .catch((error) => { console.dir(error); });
  }
  render() {
    console.dir(this.state);
    const {
      id,
      name,
      todos,
      members,
      groundRules,
    } = this.state;
    const commonAreaProps = { id, name, todos };
    const membersProps = { members };
    const rulesProps = { groundRules };

    return (
      <div>

        <div className="row">
          <img
            className="img-fluid"
            src={this.state.mainImage}
            alt="Your lovely space"
          />
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
              <Members {...props} {...membersProps}/>
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
