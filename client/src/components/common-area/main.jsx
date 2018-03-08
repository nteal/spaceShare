import React from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import Axios from 'axios';
import Todos from './todos.jsx';
import Chat from './chat.jsx';

class CommonAreaMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
  }
  render() {
    const { name, todos } = this.props;

    return (
      <div>
        <div className="row mt-1">

          <div className="col-6 pl-5">
            <div className="row">
              <div className="col">
                <div className="row">
                  <MediaQuery minDeviceWidth={800}>
                    <div className="heading-box">
                      <h1>Common Area</h1>
                    </div>
                  </MediaQuery>
                  <MediaQuery maxDeviceWidth={600}>
                    <div className="mobile-heading-box">
                      <h2>Common Area</h2>
                    </div>
                  </MediaQuery>
                </div>
                <div className="row">
                  <h2>{name}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="col-3">
            <button className="btn btn-info btn-sm mt-3 rounded-circle">info</button>
          </div>

          <div className="col-2">
            <div className="row mb-1 justify-content-end">
              <Link to="/common-area/members" className="btn btn-primary btn-block">
                Our Members
              </Link>
            </div>
            <div className="row justify-content-end">
              <Link to="/common-area/ground-rules" className="btn btn-primary btn-block">
                Our Ground Rules
              </Link>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col">
            <Todos todos={todos} />
          </div>
          <div className="col">
            <h3>Group Chat</h3>
            <Chat />
          </div>
        </div>

      </div>
    );
  }
}

export default CommonAreaMain;
