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
      <div className="row">
        You have one {event} to chat from {event.user.name}!
        <Link to="/messages" onClick={setConvo}>
          <MessageText className="mdi-btn" height={30} width={30} fill="#6F5BC0" />
        </Link>
      </div>
    </li>
  );
};

Message.propTypes = {
  event: PropTypes.shape({
    event: PropTypes.string,
    user: PropTypes.object,
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
