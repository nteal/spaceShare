import React from 'react';
import PropTypes from 'prop-types';
import CloseCircleOutline from 'mdi-react/CloseCircleOutlineIcon.js';

const ChatNavLink = (props) => {
  const {
    chat,
    category,
    setConversation,
    deleteConversation,
    setCategory,
  } = props;

  const setConvo = (event) => {
    const { id } = event.target;
    setConversation(id);
    setCategory(category);
  };

  const deleteConvo = (event) => {
    const { id } = event.target;
    deleteConversation(id);
  };
  let display;
  if (category === 'user') {
    display = (
      <div className="row d-flex align-items-center justify-content-between pl-2 pr-4">
        <a
          id={chat.id}
          className="nav-link pt-1 pb-1"
          href="#"
          onClick={setConvo}
        >
          {chat.display_name}
        </a>
        <CloseCircleOutline id={chat.id} className="mdi-btn-alt" onClick={deleteConvo} height={18} width={18} fill="#FFF" />
      </div>
    );
  } else {
    const glyph = category === 1 ? (
      <i className="material-icons md-xs mr-1">business</i>
    ) : (
      <i className="material-icons md-xs mr-1">home</i>
    );
    display = (
      <div className="row d-flex align-items-center pl-3">
        {glyph}
        <a
          id={chat.id}
          className="nav-link pl-1 pt-1 pb-1"
          href="#"
          onClick={setConvo}
        >
          {chat.display_name}
        </a>
      </div>
    );
  }
  return display;
};

ChatNavLink.propTypes = {
  chat: PropTypes.object,
  category: PropTypes.string,
  setConversation: PropTypes.func,
  deleteConversation: PropTypes.func,
  setCategory: PropTypes.func,
};

ChatNavLink.defaultProps = {
  chat: {},
  category: 'user',
  setConversation: null,
  deleteConversation: null,
  setCategory: null,
};
export default ChatNavLink;
