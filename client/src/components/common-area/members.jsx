import React from 'react';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import ConfirmModal from 'react-bootstrap4-modal';
import ArrowLeftBoldCircle from 'mdi-react/ArrowLeftBoldCircleIcon.js';
import Rocket from 'mdi-react/RocketIcon.js';
import Member from './member.jsx';

class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMember: '',
      modalVisible: false,
      ejectedMemberId: null,
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAttemptDelete = this.handleAttemptDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleBack() {
    this.props.history.goBack();
  }
  handleChange(event) {
    const { value } = event.target;
    this.setState({ newMember: value });
  }
  handleAttemptDelete(memberId) {
    this.setState({
      ejectedMemberId: memberId,
      modalVisible: true,
    });
  }
  handleAdd() {
    const { addMember } = this.props;
    const { newMember } = this.state;
    addMember(newMember);
    this.setState({ newMember: '' });
  }
  handleCancel() {
    this.setState({
      ejectedMemberId: null,
      modalVisible: false,
    });
  }
  handleDelete() {
    const { ejectedMemberId } = this.state;
    const { deleteMember } = this.props;
    deleteMember(ejectedMemberId);
    this.setState({ modalVisible: false });
  }
  render() {
    const { ownerId, members, isOwner } = this.props;
    const { modalVisible } = this.state;
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
              <div>

                <ConfirmModal visible={modalVisible} onOK={this.handleDelete} onCancel={this.handleCancel}>
                  <div className="container pt-4 pl-4 pr-4 pb-0">
                    <div className="content-box content-box-colorful">
                      <div className="row justify-content-center">
                        <div className="flex-column align-items-center">
                          <div className="row justify-content-center">
                            <Rocket className="modal-rocket" height={45} width={45} fill="#6F5BC0" />
                          </div>
                          <div className="row justify-content-center pt-2 pb-3">
                            <p className="text-center">
                              Are you sure you want to <br /> eject this user from your space?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center modal-btns pb-2">
                      <button className="btn btn-primary btn-sm pr-3 pb-0 mr-4" aria-label="confirm" onClick={this.handleDelete}>
                        <i className="material-icons md-sm">check</i>
                      </button>
                      <button className="btn btn-primary btn-sm pr-3 pb-0" aria-label="cancel" onClick={this.handleCancel}>
                        <i className="material-icons md-sm">close</i>
                      </button>
                    </div>
                  </div>
                </ConfirmModal>

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
              </div>
            )}
            <div className="row pt-2 justify-content-around">
              {members.map(member => (
                member.fb_id === ownerId ? (
                  <Member member={member} key={member.id} deleteMember={this.handleAttemptDelete} canDelete={isOwner} owner />
                ) : (
                  <Member member={member} key={member.id} deleteMember={this.handleAttemptDelete} canDelete={isOwner} />
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
