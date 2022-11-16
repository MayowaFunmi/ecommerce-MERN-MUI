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

const DrawerComp = () => {
  const [open, setOpen] = useState(false);
  const PAGES = [
    'Products',
    'Services',
    'About Us',
    'Contact Us',
    'Login',
    'Logout',
  ];

  return (
    <React.Fragment>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List>
          {PAGES.map((page, index) => {
            return (
              <ListItemButton onClick={() => setOpen(false)} key={index}>
                <ListItemIcon>
                  <ListItemText>{page}</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: 'white', marginLeft: 'auto' }}
        onClick={() => setOpen(!open)}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
