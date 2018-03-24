import React from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import LogoutVariant from 'mdi-react/LogoutVariantIcon.js';

const styles = {
  header: {
    background: 'linear-gradient(45deg, #23037E, #BD00FF)',
    fontFamily: 'Raleway',
    maxHeight: '4rem',
  },
};

const Header = (props) => {
  const headerStyle = styles.header;
  const {
    hamburger,
    title,
    mobileTitle,
    logout,
  } = props;

  return (
    <div className="container-fluid pl-0 pr-0">
      <nav className="navbar navbar-dark" style={headerStyle}>

        <MediaQuery maxDeviceWidth={799}>
          {hamburger}
        </MediaQuery>

        <MediaQuery minDeviceWidth={800}>
          <div className="row align-items-baseline ml-0">
            {title}
            <span className="nav-item">
              <Link to="/dashboard" className="header-link nav-link">
                My Dashboard
              </Link>
            </span>
          </div>
        </MediaQuery>

        <MediaQuery maxDeviceWidth={799}>
          <div className="row justify-content-center">
              {mobileTitle}
          </div>
        </MediaQuery>

        <div className="row justify-content-end mr-0">
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
      </nav>
      {props.children}
    </div>
  );
};

export default Header;
