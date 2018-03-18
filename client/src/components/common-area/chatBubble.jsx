import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

const ChatBubble = (props) => {
  const { sender, timestamp, text } = props.message;
  const timeDisplay = Moment(timestamp).fromNow();
  const display = props.message.notMessage ? (
    <small>{sender} {text} {timeDisplay}</small>
  ) : (
    <span>
      <b>{sender}</b>: {text} 
      <small>
        {Moment(timestamp).fromNow()}
      </small>
    </span>
  );

  return (
    <div className="row">
      {display}
    </div>
  );
};

ChatBubble.propTypes = {
  message: PropTypes.shape({
    sender: PropTypes.string,
    timestamp: PropTypes.string,
    text: PropTypes.string,
  }),
};

ChatBubble.defaultProps = {
  message: {
    sender: 'Bobo',
    timestamp: new Date().toISOString(),
    text: 'I love pickles',
  },
};

export default ChatBubble;
