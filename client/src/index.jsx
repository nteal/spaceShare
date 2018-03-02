import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    Axios.get('/');
  }

  render() {
    return (
      <div>
        <header>
          <h1>SpaceShare</h1>
          {/* Log out */}
        </header>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
