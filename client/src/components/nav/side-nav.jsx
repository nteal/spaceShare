import React from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import Logo from '../../assets/ss-logo-transparent.png';

const styles = {
  sidebar: {
    width: 256,
    height: '100vh',
  },
  sidebarMini: {
    backgroundColor: '#6F5BC0',
    width: 55,
    height: '100vh',
  },
  sidebarLink: {
    display: 'block',
    paddingTop: '16px',
    paddingRight: '1rem',
    color: 'white',
    textDecoration: 'none',
    backgroundColor: '#6F5BC0',
  },
  miniSidebarLink: {
    backgroundColor: '#6F5BC0',
    color: 'white',
  },
  content: {
    padding: '16px',
    height: '100vh',
    backgroundColor: '#6F5BC0',
  },
};

class SideNavItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.toggleExpand = this.toggleExpand.bind(this);
  }
  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }
  render() {
    const { toggleOpen } = this.props;
    const { expanded } = this.state;

    const expandedNav = (
      <nav style={styles.content} onClick={toggleOpen} onKeyDown={toggleOpen} onMouseLeave={this.toggleExpand}>
        <Link className="btn btn-primary" to="/" style={styles.sidebarLink} onClick={this.toggleExpand}>
          <h4>SpaceShare</h4>
        </Link>
        <Link className="btn btn-primary" to="/" style={styles.sidebarLink} onClick={this.toggleExpand}>
          <div className="row pl-2">
            <i className="material-icons sidebar-icon">home</i>
            Your Spaces
          </div>
        </Link>
        <Link className="btn btn-primary" to="/messages" style={styles.sidebarLink} onClick={this.toggleExpand}>
          <div className="row pl-2">
            <i className="material-icons sidebar-icon">chat</i>
            Messages
          </div>
        </Link>
        <Link className="btn btn-primary" to="/new-space" style={styles.sidebarLink} onClick={this.toggleExpand}>
          <div className="row pl-2">
            <i className="material-icons sidebar-icon">add_location</i>
            New Space
          </div>
        </Link>
        <Link className="btn btn-primary" to="/search" style={styles.sidebarLink} onClick={this.toggleExpand}>
          <div className="row pl-2">
            <i className="material-icons sidebar-icon">search</i>
            New Search
          </div>
        </Link>
        <Link className="btn btn-primary" to="/saved-searches" style={styles.sidebarLink} onClick={this.toggleExpand}>
          <div className="row pl-2">
            <i className="material-icons sidebar-icon">book</i>
            Saved Searches
          </div>
        </Link>
        <Link className="btn btn-primary" to="/listings" style={styles.sidebarLink} onClick={this.toggleExpand}>
          <div className="row pl-2">
            <i className="material-icons sidebar-icon">list</i>
            All Listings
          </div>
        </Link>
      </nav>
    );

    return (
      <div>
        <MediaQuery minDeviceWidth={800}>
          {expanded && expandedNav}
          {!expanded && (
            <nav style={styles.sidebarMini} className="nav flex-column align-items-center" onMouseOver={this.toggleExpand} onFocus={this.toggleExpand}>
              <Link to="/" style={styles.sidebarLink}>
                <img src={Logo} className="mobile-logo m-2" alt="SpaceShare logo" />
              </Link>
              <Link to="/" style={styles.sidebarLink} className="nav-item nav-link main-nav-link">
                <i className="material-icons md-h3 m-2">home</i>
              </Link>
              <Link to="/messages" style={styles.sidebarLink} className="nav-item nav-link main-nav-link">
                <i className="material-icons md-h3 m-2">chat</i>
              </Link>
              <Link to="/new-space" style={styles.sidebarLink} className="nav-item nav-link main-nav-link">
                <i className="material-icons md-h3 m-2">add_location</i>
              </Link>
              <Link to="/search" style={styles.sidebarLink} className="nav-item nav-link main-nav-link">
                <i className="material-icons md-h3 m-2">search</i>
              </Link>
              <Link to="/saved-searches" style={styles.sidebarLink} className="nav-item nav-link main-nav-link">
                <i className="material-icons md-h3 m-2">book</i>
              </Link>
              <Link to="/listings" style={styles.sidebarLink} className="nav-item nav-link main-nav-link">
                <i className="material-icons md-h3 m-2">list</i>
              </Link>
            </nav>
          )}
        </MediaQuery>
        <MediaQuery maxDeviceWidth={799}>
          {expandedNav}
        </MediaQuery>
      </div>
    );
  }
}

SideNavItems.propTypes = {
  toggleOpen: PropTypes.func,
};

SideNavItems.defaultProps = {
  toggleOpen: null,
};

export default SideNavItems;
