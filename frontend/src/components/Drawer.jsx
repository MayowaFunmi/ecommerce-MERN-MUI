import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';

const DrawerNav = () => {
  const [open, setOpen] = useState(false);
  const PAGES = {
    Contact: '/contact_us',
    About: '/about_us',
    Products: '/all_products',
    Register: '/register',
    Login: '/login',
  };
  return (
    <React.Fragment>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List>
          {Object.keys(PAGES).map((page, index) => {
            return (
              <ListItemButton
                component={Link}
                to={PAGES[page]}
                key={index}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <ListItemText>{page}</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{ color: 'white', marginLeft: 'auto' }}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerNav;
