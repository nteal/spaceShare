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
      <form>
        <div className="rom">
          <h1>New Space</h1>
        </div>
      </form>
    );
  }
}

export default CreateSpace;
