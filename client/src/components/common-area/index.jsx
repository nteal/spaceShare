import React from 'react';
import Todos from './todos.jsx';
import ResourceManagement from './resource-management.jsx';

class CommonArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div>
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
