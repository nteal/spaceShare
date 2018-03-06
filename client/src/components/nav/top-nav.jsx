import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuIcon,
} from 'material-ui';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const TopNav = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="title" color="inherit" className={classes.flex}>
            SpaceShare
          </Typography>
          <Button component={Link} to="/dashboard">
            My Dashboard
          </Button>
          <Button>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(TopNav);
