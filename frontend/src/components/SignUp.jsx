import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
} from '@mui/material';
import React from 'react';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

const theme = createTheme();
const IconTextField = ({ iconStart, iconEnd, InputProps, ...props }) => {
  return (
    <TextField
      {...props}
      InputProps={{
        ...InputProps,
        startAdornment: iconStart ? (
          <InputAdornment position="start" sx={{ color: 'blue' }}>
            {iconStart}
          </InputAdornment>
        ) : null,
        endAdornment: iconEnd ? (
          <InputAdornment position="end">{iconEnd}</InputAdornment>
        ) : null,
      }}
    />
  );
};
const SignUp = () => {
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '50ch' },
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Container component="form">
            <div>
              <IconTextField
                label="Username"
                iconStart={<VerifiedUserIcon />}
                required
              />
            </div>
            <div>
              <IconTextField
                label="First Name"
                iconStart={<VerifiedUserIcon />}
                required
              />
            </div>
            <div>
              <IconTextField
                label="Last Name"
                iconStart={<VerifiedUserIcon />}
                required
              />
            </div>
            <div>
              <IconTextField
                label="E-mail"
                iconStart={<VerifiedUserIcon />}
                required
                type="email"
              />
            </div>
            <div>
              <IconTextField
                onChange={handlePasswordChange('password')}
                label="Password"
                iconStart={
                  <IconButton
                    sx={{ color: 'blue' }}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                }
                required
                type={values.showPassword ? 'text' : 'password'}
              />
            </div>
          </Container>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
