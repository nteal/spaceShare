import React from 'react';
import { Link } from 'react-router-dom';
import Email from 'mdi-react/EmailIcon.js';

const Member = (props) => {
  const {
    id,
    image_url,
    name_first,
    name_last,
    phone,
    email,
  } = props.member;

  const isOwner = !!props.owner;

  return (
    <div className="col-10 col-sm-6 col-md-4 col-lg-4">
      <div className="content-box member-card container pb-0">
        <div className="row">
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
            <ul>
              <li>
                {phone}
              </li>
              <li>
                {email}
              </li>
              {isOwner && (
                <li>
                  Owner
                </li>
              )}
            </ul>
            <div className="row justify-content-end pr-4">
              <Link to={{ pathname: '/messages', state: { userId: id } }}>
                <Email className="mdi-btn" height={30} width={30} fill="#6F5BC0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
