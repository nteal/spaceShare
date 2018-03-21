import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

const ChatBubble = (props) => {
  const { isMe, notMessage, sender, timestamp, text } = props.message;
  const timeDisplay = Moment(timestamp).fromNow();
  let display;
  if (notMessage) {
    display = (
        <div className="row ml-0">
          <small>{sender} {text} {timeDisplay}</small>
        </div>
    );
  } else if (isMe) {
    display = (
      <div className="row pt-2 ml-0">
        <div className="col pr-0">
          <div className="row pl-3 pr-3 justify-content-between w-100 mr-0">
            {sender}
            <small>
              {Moment(timestamp).fromNow()}
            </small>
          </div>
          <div className="row justify-content-between pl-4">
            <div className="chat-bubble-me pt-2 pr-2 pb-2 pl-2">
              {text}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    display = (
      <div className="row pt-2 ml-0">
        <div className="col">
          <div className="row justify-content-between w-100 mr-0 pr-3">
            {sender}
            <small>
              {Moment(timestamp).fromNow()}
            </small>
          </div>
          <div className="row justify-content-between pr-4">
            <div className="chat-bubble pt-2 pr-2 pb-2 pl-2">
              {text}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return display;
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
