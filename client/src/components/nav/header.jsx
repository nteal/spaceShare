import React from 'react';

const styles = {
  root: {},
  header: {
    background: 'linear-gradient(45deg, #23037E, #BD00FF)',
    color: 'white',
    padding: '16px',
    fontSize: '1.5em',
  },
};

const Header = (props) => {
  const rootStyle = styles.root;
  const headerStyle = props.style ? props.style : styles.header;

  return (
    <div style={rootStyle}>
      <div style={headerStyle}>{props.title}</div>
      {props.children}
    </div>
  );
};

export default Header;
