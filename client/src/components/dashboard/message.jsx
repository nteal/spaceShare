import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MessageText from 'mdi-react/MessageTextIcon.js';

const Message = (props) => {
  const { event, setConversation } = props;

  const setConvo = () => {
    setConversation(event.conversationId);
  };
  return (
    <li className="list-group-item">
      <Link to="/messages" onClick={setConvo}>
        <div className="row d-flex align-items-center pl-3 pr-3">
          <MessageText className="mdi-btn mr-2" height={25} width={25} fill="#6F5BC0" />
          You have one {event.event} to chat from {event.user}!
        </div>
      </Link>
    </li>
  );
};

Message.propTypes = {
  event: PropTypes.shape({
    event: PropTypes.string,
    user: PropTypes.string,
    conversationId: PropTypes.string,
  }),
  setConversation: PropTypes.func,
};

Message.defaultProps = {
  event: {
    event: 'invite',
    user: { display_name: 'Bobo', name: 0 },
    conversationId: '',
  },
  setConversation: null,
};
export default Message;
