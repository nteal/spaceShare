import React from 'react';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { heading } = this.props;
    return (
      <div>
        <h1>{heading}</h1>
      </div>
    );
  }
}

export default Results;
