import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import MailIcon from 'material-ui-icons/Mail';
import AddLocationIcon from 'material-ui-icons/AddLocation';
import SearchIcon from 'material-ui-icons/Search';
import BookIcon from 'material-ui-icons/Book';
import ListIcon from 'material-ui-icons/List';

const SideNavListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Your Spaces" />
    </ListItem>
    <ListItem button component={Link} to="/messages">
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="Messages" />
    </ListItem>
    <ListItem button component={Link} to="/new-space">
      <ListItemIcon>
        <AddLocationIcon />
      </ListItemIcon>
      <ListItemText primary="New Space" />
    </ListItem>
    <ListItem button component={Link} to="/search">
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="New Search" />
    </ListItem>
    <ListItem button component={Link} to="/saved-searches">
      <ListItemIcon>
        <BookIcon />
      </ListItemIcon>
      <ListItemText primary="Saved Searches" />
    </ListItem>
    <ListItem button component={Link} to="/listings">
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="All Listings" />
    </ListItem>
  </div>
);

export default SideNavListItems;
