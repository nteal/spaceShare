import React from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import Information from 'mdi-react/InformationIcon.js';
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
    const {
      id,
      name,
      todos,
      complete,
      incomplete,
      setTodos,
      submitTodos,
      purpose,
      conversationId,
      chat,
      incomingMessages,
      typingStatus,
    } = this.props;
    const purposeGlyph = purpose === 'Live' ? (
      <i className="material-icons md-h3 mr-1">home</i>
    ) : (
      <i className="material-icons md-h3 mr-1">business</i>
    );

    return (
      <div className="container">
        <div className="row mt-1 justify-content-around">

          <div className="col-10 col-lg-8">
            <div className="row">
              <div className="col">
                <div className="row">
                  <MediaQuery minDeviceWidth={800}>
                    <div className="heading-box mt-neg">
                      <h1>Common Area</h1>
                    </div>
                  </MediaQuery>
                  <MediaQuery maxDeviceWidth={600}>
                    <div className="mobile-heading-box mt-neg">
                      <h2>Common Area</h2>
                    </div>
                  </MediaQuery>
                </div>
                <div className="d-flex flex-row align-items-center">
                  {purposeGlyph}<h2>{name}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="col-2 col-lg-1">
            <Link to={{ pathname: '/listing', state: { spaceId: id } }}>
              <Information className="mdi-btn" height={40} width={40} fill="#6F5BC0" />
            </Link>
          </div>

          <div className="col-11 col-lg-2">
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
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 d-flex flex-column">
            <Todos
              todos={todos}
              complete={complete}
              incomplete={incomplete}
              setTodos={setTodos}
              submitTodos={submitTodos}
            />
          </div>
          <div className="col-12 col-sm-12 col-md-8 col-lg-8 d-flex flex-column">
            <Chat 
              chat={chat}
              conversationId={conversationId}
              incomingMessages={incomingMessages}
              typingStatus={typingStatus}
            />
          </div>
        </div>

      </div>
    );
  }
}

CommonAreaMain.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  todos: PropTypes.array,
  complete: PropTypes.array,
  incomplete: PropTypes.array,
  setTodos: PropTypes.func,
  submitTodos: PropTypes.func,
  purpose: PropTypes.string,
  conversationId: PropTypes.string,
  chat: PropTypes.object,
  incomingMessages: PropTypes.array,
  typingStatus: PropTypes.string,
};

CommonAreaMain.defaultProps = {
  id: null,
  name: 'A Space Neither Here Nor There',
  todos: [],
  complete: [],
  incomplete: [],
  setTodos: null,
  submitTodos: null,
  purpose: 'Live',
  conversationId: null,
  chat: null,
  incomingMessages: [],
  typingStatus: '',
};

export default CommonAreaMain;
