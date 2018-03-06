import React from 'react';

class CreateSpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    console.log('new space did mount');
  }
  render() {
    return (
      <div>
        <h1>New Space</h1>
        {/* create a space */}
      </div>
    );
  }
}

export default CreateSpace;
