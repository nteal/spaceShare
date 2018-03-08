import React from 'react';
import Axios from 'axios';
import Todos from './todos.jsx';

class CommonArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      todos: [],
    };
  }
  componentDidMount() {
    console.log('common area did mount');
    Axios({
      method: 'get',
      url: 'http://localhost:3003/currentSpace/',
    })
      .then((space) => {
        this.setState({
          name: space.data.name,
          todos: space.data.todos,
        });
      })
      .catch((error) => { console.dir(error); });
  }
  render() {
    console.dir(this.state);
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
          
          <div className="col-6 pl-5">
            <div className="row">
              <div className="col">
                <div className="row">
                  <h1>Common Area</h1>
                </div>
                <div className="row">
                  <h2>{this.state.name}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="col-3">
            <button className="btn btn-info btn-sm mt-3 rounded-circle">info</button>
          </div>

          <div className="col-2">
            <div className="row mb-1 justify-content-end">
              <button className="btn btn-secondary">Our Members</button>
            </div>
            <div className="row justify-content-end">
              <button className="btn btn-secondary">Our Ground Rules</button>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col">
            <Todos todos={this.state.todos} />
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
