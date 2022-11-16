import React, { useState } from 'react';
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ShoppingCartCheckout } from '@mui/icons-material';
import DrawerComp from './Drawer';

const Header = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log('theme = ', theme);
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  console.log('isMatch = ', isMatch);
  const PAGES = ['Products', 'Services', 'About Us', 'Contact Us'];
  return (
    <React.Fragment>
      <AppBar sx={{ background: 'green' }}>
        <Toolbar>
          {isMatch ? (
            <>
              <ShoppingCartCheckout />
              <Typography sx={{ fontSize: '2rem', paddingLeft: '10%' }}>
                SHOPEE
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <ShoppingCartCheckout />
              <Tabs
                sx={{ marginLeft: 'auto' }}
                textColor="inherit"
                value={value}
                indicatorColor="secondary"
                onChange={(e, value) => setValue(value)}
              >
                {PAGES.map((page, index) => {
                  return <Tab key={index} label={page} />;
                })}
              </Tabs>
              <Button sx={{ marginLeft: 'auto' }} variant="contained">
                Login
              </Button>
              <Button sx={{ marginLeft: '10px' }} variant="contained">
                SignUp
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
