import React from 'react';
import Todos from './todos.jsx';
import ResourceManagement from './resource-management.jsx';

class CommonArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    console.log('common area did mount');
  }
  render() {
    return (
      <div>
        <h1>Common Area</h1>
        <div>
          <Todos />
        </div>
        <div>
          <ResourceManagement />
        </div>
        {/* chat */}
      </div>
    );
  }
}

export default CommonArea;
