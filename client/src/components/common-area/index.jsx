import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Axios from 'axios';

import CommonAreaMain from './main.jsx';
import Members from './members.jsx';
import GroundRules from './ground-rules.jsx';

class CommonArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      todos: [],
      main_image: 'https://kaggle2.blob.core.windows.net/competitions/kaggle/5407/media/housesbanner.png',
    };
  }
  componentDidMount() {
    console.log('common area did mount');
    Axios.get('http://localhost:3003/currentSpace/', {
      params: { spaceId: this.props.location.state.spaceId },
    })
      .then((space) => {
        this.setState({
          name: space.data.name,
          todos: space.data.todos,
          main_image: space.data.main_image,
        });
      })
      .catch((error) => { console.dir(error); });
  }
  render() {
    console.dir(this.state);
    const { name, todos } = this.state;
    const commonAreaProps = { name, todos };

    return (
      <div>

        <div className="row">
          <img
            className="img-fluid"
            src={this.state.main_image}
            alt="https://kaggle2.blob.core.windows.net/competitions/kaggle/5407/media/housesbanner.png"
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
          <Route path="/common-area/members" component={Members} />
          <Route path="/common-area/ground-rules" component={GroundRules} />
        </Switch>

      </div>
    );
  }
}

export default CommonArea;
