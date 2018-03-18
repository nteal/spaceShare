import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

const ChatBubble = (props) => {
  const { sender, timestamp, text } = props.message;
  return (
    <div className="row">
      <b>{sender}</b>: {text} 
      <small>
        {Moment(timestamp).fromNow()}
      </small>

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
