import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Axios from 'axios';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

import Login from '../login/index.jsx';
import Dashboard from '../dashboard/index.jsx';
import CommonArea from '../common-area/index.jsx';
import ChatMain from '../chat-main/index.jsx';
import CreateSpace from '../create-a-space/index.jsx';
import Search from '../search/index.jsx';
import SearchResults from '../search-results/index.jsx';
import SideNavListItems from './side-nav.jsx';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    // ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});
class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true,
      drawerOpen: false,
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }
  componentDidMount() {
    console.log('nav did mount');
    // check if user is authenticated; if they aren't, redirect to /
    Axios.get('/isAuthenticated')
      .then((response) => {
        if (response.data === false) {
          this.setState({ isAuthenticated: false });
        }
      })
      .catch((error) => {
        console.error('error checking authentication', error);
      });
  }

  handleDrawerOpen() {
    this.setState({ drawerOpen: true });
  }

  handleDrawerClose() {
    this.setState({ drawerOpen: false });
  }


  render() {
    const { classes, theme } = this.props;
    const { isAuthenticated } = this.state;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.drawerOpen && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.drawerOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component={Link} to="/" variant="title" color="inherit" noWrap>
              SpaceShare
            </Typography>
            <Button component={Link} to="/dashboard" color="inherit">
              My Dashboard
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.drawerOpen && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>{SideNavListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route exact path="/" render={() => (
            isAuthenticated ? (
              <Redirect to="/dashboard" />
            ) : (
              <Login />
            )
          )}
          />
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/common-area" component={CommonArea} />
            <Route path="/messages" component={ChatMain} />
            <Route path="/new-space" component={CreateSpace} />
            <Route path="/search" component={Search} />
            <Route path="/listings" component={SearchResults} />
            <Route path="/saved-searches" component={SearchResults} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Nav);
