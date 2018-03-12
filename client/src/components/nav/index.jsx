import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Axios from 'axios';
import MediaQuery from 'react-responsive';
import Sidebar from 'react-sidebar';

import Login from '../login/index.jsx';
import Dashboard from '../dashboard/index.jsx';
import EditProfile from '../profile/editProfile.jsx';
import Profile from '../profile/index.jsx';
import CommonArea from '../common-area/index.jsx';
import ChatMain from '../chat-main/index.jsx';
import CreateSpace from '../create-a-space/index.jsx';
import Listing from '../listing/index.jsx';
import EditListing from '../listing/editListing.jsx';
import Search from '../search/index.jsx';
import SideNavItems from './side-nav.jsx';
import Header from './header.jsx';
import Logo from '../../assets/ss-logo-transparent.png';
import AllListings from '../all-listings/index.jsx';
import SearchResults from '../search-results/index.jsx';
import PastSearches from '../past-searches/index.jsx';

const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8,
  },
  content: {
    fontFamily: 'Raleway',
  },
};

const mql = window.matchMedia(`(min-width: 800px)`);

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true,
      mql: mql,
      docked: props.docked,
      open: props.open,
      transitions: true,
      touch: true,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.fbLogout = this.fbLogout.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }
  componentDidMount() {
    console.log('nav did mount');
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, sidebarDocked: mql.matches});
    // check if user is authenticated; if they aren't, redirect to /
    // console.log('moved nav auth check to 3002');
    Axios.get(`/api/isAuthenticated/${localStorage.getItem('id_token')}`)
      .then((response) => {
        // console.log('nav auth response exposed');
        if (response.data === false) {
          this.setState({ isAuthenticated: false });
        }
      })
      .catch(error => {
        console.error('error checking authentication', error);
      });
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  fbLogout() {
    console.log('logging out!');
    localStorage.removeItem('id_token');
    this.setState({
      isAuthenticated: false,
    });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: this.state.mql.matches });
  }

  toggleOpen(event) {
    console.log('toggled');
    this.setState({ open: !this.state.open });
    if (event) {
      event.preventDefault();
    }
  }


  render() {
    const { isAuthenticated } = this.state;

    const sidebar = <SideNavItems toggleOpen={this.toggleOpen} />;

    const contentHeader = (
      <span className="pr-2">
        <MediaQuery minDeviceWidth={800}>
          <Link to="/">
            <span>SpaceShare</span>
          </Link>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={799}>
          <Link to="/">
            <img src={Logo} className="mobile-logo" alt="SpaceShare logo" />
          </Link>
        </MediaQuery>
      </span>
    );

    const hamburger = (
      <span className="pl-0 pr-2">
        {!this.state.docked &&
        <a onClick={this.toggleOpen} href="#" style={styles.contentHeaderMenuLink}>
          <i className="material-icons">menu</i>
        </a>}
      </span>
    );

    const contentHeaderMobile = (
      <span>
        <Link to="/">
          <img src={Logo} className="mobile-logo" alt="SpaceShare logo" />
        </Link>
      </span>
    );

    const sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      open: this.state.open,
      touch: this.state.touch,
      transitions: this.state.transitions,
      onSetOpen: this.onSetSidebarOpen,
    };

    if (isAuthenticated) {
      return (
        <Sidebar {...sidebarProps}>
          <Header hamburger={hamburger} title={contentHeader} mobileTitle={contentHeaderMobile} logout={this.fbLogout}>
            <div style={styles.content}>
              <Route
                exact
                path="/"
                render={() => (
                  isAuthenticated && (<Redirect to="/dashboard" />)
                )}
              />
              <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/edit-profile" component={EditProfile} />
                <Route path="/profile" component={Profile} />
                <Route path="/common-area" component={CommonArea} />
                <Route path="/messages" component={ChatMain} />
                <Route path="/new-space" component={CreateSpace} />
                <Route path="/listing" component={Listing} />
                <Route path="/edit-listing" component={EditListing} />
                <Route path="/edit-space" component={CreateSpace} />
                <Route path="/search" component={Search} />
                <Route path="/search-results" component={SearchResults} />
                <Route path="/listings" component={AllListings} />
                <Route path="/saved-searches" component={PastSearches} />
              </Switch>
            </div>
          </Header>
        </Sidebar>
      );
    }
    return <Login />;
  }
}

export default Nav;
