import React from 'react';
import { Link } from 'react-router-dom';
import Header from './header.jsx';

const styles = {
  sidebar: {
    width: 256,
    height: '100%',
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: 'white',
    textDecoration: 'none',
    backgroundColor: '#6F5BC0',
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: '16px',
    height: '100%',
    backgroundColor: '#6F5BC0',
  },
};

const SideNavItems = (props) => {
  const { toggleOpen } = props;
  const style = styles.sidebar;

  return (
      <div style={styles.content} onClick={toggleOpen}>
        <Link className="btn btn-primary" to="/" style={styles.sidebarLink}>
          <h4>SpaceShare</h4>
        </Link>
        <Link className="btn btn-primary" to="/" style={styles.sidebarLink}>
          <i className="material-icons sidebar-icon">home</i>
          Your Spaces
        </Link>
        <Link className="btn btn-primary" to="/messages" style={styles.sidebarLink}>
          <i className="material-icons sidebar-icon">mail</i>
          Messages
        </Link>
        <Link className="btn btn-primary" to="/new-space" style={styles.sidebarLink}>
          <i className="material-icons sidebar-icon">add_location</i>
          New Space
        </Link>
        <Link className="btn btn-primary" to="/search" style={styles.sidebarLink}>
          <i className="material-icons sidebar-icon">search</i>
          New Search
        </Link>
        <Link className="btn btn-primary" to="/saved-searches" style={styles.sidebarLink}>
          <i className="material-icons sidebar-icon">book</i>
          Saved Searches
        </Link>
        <Link className="btn btn-primary" to="/listings" style={styles.sidebarLink}>
          <i className="material-icons sidebar-icon">list</i>
          All Listings
        </Link>
      </div>
  );
};


export default SideNavItems;
