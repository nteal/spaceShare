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
        <div className="row">
          <div className="col">
            <h1>{heading}</h1>
          </div>
          <div className="col">
            <div className="row">
              <button>New Search</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Results;
