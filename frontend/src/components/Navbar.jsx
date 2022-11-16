import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  Tabs,
  Tab,
  useMediaQuery,
} from '@mui/material';
import DrawerNav from './Drawer';
import { ShoppingCartCheckout } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const LinkTab = (props) => {
  return <Tab component={Link} {...props} />;
};
const Navbar = () => {
  const [value, setValue] = useState(0);
  //const PAGES = ['Contact Us', 'About', 'Register', 'Login'];
  const PAGES = {
    Contact: '/contact_us',
    About: '/about_us',
    Products: '/all_products',
    Register: '/register',
    Login: '/login',
  };
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar>
          {isMatch ? (
            <>
              <ShoppingCartCheckout />
              <Typography sx={{ fontSize: '2rem', paddingLeft: '10%' }}>
                MayorShop
              </Typography>
              <DrawerNav />
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
                {Object.keys(PAGES).map((x, index) => {
                  return <LinkTab key={index} label={x} to={PAGES[x]} />;
                })}
              </Tabs>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
