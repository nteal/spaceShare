import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MessageText from 'mdi-react/MessageTextIcon.js';

const Member = (props) => {
  const { canDelete, member, startNewChat } = props;
  const {
    id,
    nexmo_id,
    image_url,
    name_first,
    name_last,
    phone,
    email,
  } = member;

  const isOwner = !!props.owner;
  const phoneStr = `${phone}`;
  const phoneDisplay = `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
  const handleDelete = () => {
    props.deleteMember(id);
  };

  const messageUser = () => {
    startNewChat(nexmo_id, name_first, name_last);
  };
  return (
    <div className="col-10 col-sm-6 col-md-4 col-lg-4 d-flex flex-column pt-4">
      <div className="content-box member-card container pb-0">
        <div className="row">
          {canDelete && (
            <button className="btn btn-primary btn-block" aria-label="remove this member from this space" onClick={handleDelete}>
              <div className="row pl-2">
                <i className="material-icons sidebar-icon">delete_forever</i>
                Eject this member
              </div>
            </button>
          )}
          <div className="member-img-box">
            <img className="card-img-top member-img" src={image_url} alt={`${name_first}'s face`} />
          </div>
          <div className="mini-heading-box-side">
            <h5>
              <Link to={{ pathname: '/profile', state: { userId: id } }}>
                {name_first} {name_last}
              </Link>
            </h5>
          </div>
          <div className="col pt-2 pb-0">
            <ul className="no-bullets">
              <li>
                <div className="row d-flex align-items-center pl-2">
                  <i className="material-icons md-sm mr-2">phone</i>
                  {phoneDisplay}
                </div>
              </li>
              <li>
                <div className="row d-flex align-items-center pl-2">
                  <i className="material-icons md-sm mr-2">email</i>
                  {email}
                </div>
              </li>
              {isOwner && (
                <li>
                  <div className="row d-flex align-items-center pl-2">
                    <i className="material-icons md-sm mr-2">star_border</i>
                    Owner
                  </div>
                </li>
              )}
            </ul>
            {isOwner && (
              <div className="row justify-content-end pr-2">
                <Link to="/messages" onClick={messageUser}>
                  <MessageText className="mdi-btn" height={30} width={30} fill="#6F5BC0" />
                </Link>
              </div>
            )}
            {!isOwner && (
              <div className="row justify-content-end pr-2 mt-5">
                <Link to="/messages" onClick={messageUser}>
                  <MessageText className="mdi-btn" height={30} width={30} fill="#6F5BC0" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Member.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.number,
    nexmo_id: PropTypes.string,
    image_url: PropTypes.string,
    name_first: PropTypes.string,
    name_last: PropTypes.string,
    phone: PropTypes.number,
    email: PropTypes.string,
  }),
  owner: PropTypes.bool,
  canDelete: PropTypes.bool,
  deleteMember: PropTypes.func,
  startNewChat: PropTypes.func,
};

Member.defaultProps = {
  member: {
    id: null,
    nexmo_id: null,
    image_url: 'http://vectips.com/wp-content/uploads/2017/04/14-astronaut-flat.jpg',
    name_first: 'Bobo',
    name_last: 'Boberton',
    phone: 1234567890,
    email: 'bobo@veryspecialpickles.com',
  },
  owner: false,
  canDelete: false,
  deleteMember: null,
  startNewChat: null,
};

export default Member;
