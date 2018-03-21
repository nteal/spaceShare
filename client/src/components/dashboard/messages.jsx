import React from 'react';
import PropTypes from 'prop-types';
import Message from './message.jsx';

const Messages = (props) => {
  const { newEvents, setConversation } = props;

  return (
    <div className="content-box">
      <div className="mini-heading-box-top">
        <h5>You have {newEvents.length} new messages!</h5>
      </div>
      <ul className="list-group list-group-flush">
        {newEvents.map(event => (
          <Message event={event} setConversation={setConversation} key={event.conversationId} />
        ))}
      </ul>
    </div>
  );
};

Messages.propTypes = {
  newEvents: PropTypes.arrayOf(PropTypes.object),
  setConversation: PropTypes.func,
};

Messages.defaultProps = {
  newEvents: [{}],
  setConversation: null,
};

export default Messages;
