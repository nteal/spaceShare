import React from 'react';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import ArrowLeftBoldCircle from 'mdi-react/ArrowLeftBoldCircleIcon.js';
import Member from './member.jsx';

class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMember: '',
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  handleBack() {
    this.props.history.goBack();
  }
  handleChange(event) {
    const { value } = event.target;
    this.setState({ newMember: value });
  }
  handleAdd() {
    const { addMember } = this.props;
    const { newMember } = this.state;
    addMember(newMember);
    this.setState({ newMember: '' });
  }
  render() {
    const { ownerId, members, deleteMember, isOwner } = this.props;
    return (
      <div>
        <MediaQuery minDeviceWidth={800}>
          <button className="custom-btn" onClick={this.handleBack}>
            <ArrowLeftBoldCircle className="mdi-btn" height={50} width={50} fill="#6F5BC0" />
          </button>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={799}>
          <button className="custom-btn mobile-back-btn" onClick={this.handleBack}>
            <ArrowLeftBoldCircle className="mdi-btn" height={75} width={75} fill="#6F5BC0" />
          </button>
        </MediaQuery>
  
        <div className="container mt-neg-3">
          <div className="row">
            <MediaQuery minDeviceWidth={800}>
              <div className="heading-box mt-neg">
                <h1>Our Members</h1>
              </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={600}>
              <div className="mobile-heading-box mt-neg-3">
                <h2>Our Members</h2>
              </div>
            </MediaQuery>
          </div>
          <main>
            {isOwner && (
              <div className="row pt-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add a member with their Facebook id"
                    aria-label="Add a member with their Facebook id"
                    onChange={this.handleChange}
                    value={this.state.newMember}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary pb-0" type="button" onClick={this.handleAdd}>
                      <i className="material-icons">add</i>
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="row pt-2 justify-content-around">
              {members.map(member => (
                member.fb_id === ownerId ? (
                  <Member member={member} key={member.id} deleteMember={deleteMember} canDelete={isOwner} owner />
                ) : (
                  <Member member={member} key={member.id} deleteMember={deleteMember} canDelete={isOwner} />
                )
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

Members.propTypes = {
  ownerId: PropTypes.string,
  members: PropTypes.array,
  addMember: PropTypes.func,
  deleteMember: PropTypes.func,
  isOwner: PropTypes.bool,
};

Members.defaultProps = {
  ownerId: null,
  members: [],
  addMember: null,
  deleteMember: null,
  isOwner: false,
};

export default Members;
