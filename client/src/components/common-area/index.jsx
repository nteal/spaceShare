import React from 'react';
import Todos from './todos.jsx';

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

        <div className="row">
          <img
            className="img-fluid"
            src="https://kaggle2.blob.core.windows.net/competitions/kaggle/5407/media/housesbanner.png"
            alt="https://kaggle2.blob.core.windows.net/competitions/kaggle/5407/media/housesbanner.png"
          />
        </div>

        <div className="row mt-1">
          <div className="col">
            <div className="row">
              <h1>Common Area</h1>
              <button className="btn btn-info">info</button>
            </div>
          </div>
          <div className="col">
            <div className="row mb-1">
              <button className="btn btn-secondary">Our Members</button>
            </div>
            <div className="row">
              <button className="btn btn-secondary">Our Ground Rules</button>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col">
            <Todos />
          </div>
          <div className="col">
            <h3>Group Chat</h3>
            {/* chat */}
          </div>
        </div>

      </div>
    );
  }
}

export default CommonArea;
