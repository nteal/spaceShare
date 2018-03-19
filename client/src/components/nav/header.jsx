import React from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import LogoutVariant from 'mdi-react/LogoutVariantIcon.js';

const styles = {
  root: {},
  header: {
    background: 'linear-gradient(45deg, #23037E, #BD00FF)',
    color: 'white',
    padding: '16px',
    fontSize: '1.5em',
    maxHeight: '4rem',
  },
};

const Header = (props) => {
  const rootStyle = styles.root;
  const headerStyle = props.style ? props.style : styles.header;
  const {
    hamburger,
    title,
    mobileTitle,
    logout,
  } = props;

  return (
    <div className="container-fluid pl-0" style={rootStyle}>
      <div className="row" style={headerStyle}>
        <div className="col-5 col-lg-6">
          <div className="d-flex align-items-center">
            {hamburger}
            <MediaQuery minDeviceWidth={800}>
              {title}
              <span>
                <Link to="/dashboard" className="header-link">
                  My Dashboard
                </Link>
                <span className="header-link">About</span>
                <span className="header-link">Disclaimer</span>
              </span>
            </MediaQuery>
          </div>
        </div>
        <MediaQuery maxDeviceWidth={799}>
          <div className="col-2">
            <div className="row justify-content-center">
                {mobileTitle}
            </div>
          </div>
        </MediaQuery>
        <div className="col-5 col-lg-6">
          <div className="row justify-content-end">
            <MediaQuery minDeviceWidth={800}>
              <Link to="/" type="button" className="btn btn-outline-light" onClick={logout}>
                Logout
              </Link>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={799}>
              <Link to="/">
                <LogoutVariant onClick={logout} className="mdi-btn" height={35} width={35} fill="#FFF" />
              </Link>
            </MediaQuery>
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default Header;
