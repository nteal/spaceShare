import React from 'react';
import MediaQuery from 'react-responsive';
import ArrowLeftBoldCircle from 'mdi-react/ArrowLeftBoldCircleIcon.js';
import Member from './member.jsx';

const Members = (props) => {
  const { ownerId, members } = props;
  const handleBack = () => {
    props.history.goBack();
  };
  return (
    <div className="container">
      <div className="row">
        <MediaQuery minDeviceWidth={800}>
          <div className="heading-box mt-neg">
            <h1>Our Members</h1>
          </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={600}>
          <div className="mobile-heading-box mt-neg">
            <h2>Our Members</h2>
          </div>
        </MediaQuery>
      </div>
      <div className="row">
        <button className="custom-btn" onClick={handleBack}>
          <ArrowLeftBoldCircle className="mdi-btn" height={50} width={50} fill="#6F5BC0" />
        </button>
      </div>
      <main>
        <div className="row justify-content-around">
          {members.map(member => (
            member.fb_id === ownerId ? (
              <Member member={member} key={member.id} owner />
            ) : (
              <Member member={member} key={member.id} />
            )
          ))}
        </div>
      </main>
    </div>
  );
};

export default Members;
