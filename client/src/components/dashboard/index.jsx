import React from 'react';
import Profile from './profile.jsx';
import Messages from './messages.jsx';
import Spaces from './spaces.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    console.log('dashboard did mount');
  }
  render() {
    return (
      <div>
        <h1>Your Dashboard</h1>
        <Profile />
        <Messages />
        <Spaces />
      </div>
    );
  }
}

export default Dashboard;
