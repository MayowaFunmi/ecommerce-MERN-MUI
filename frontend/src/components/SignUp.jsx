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
import PersonIcon from '@mui/icons-material/Person';
import Person2Icon from '@mui/icons-material/Person2';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/authSlice';

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
const SpanStyled = styled.span`
  color: red;
`;
const SignUp = () => {
  const dispatch = useDispatch(); // send user data from form to backend
  const auth = useSelector((state) => state.auth);

  const [values, setValues] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  });
  const [values2, setValues2] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  });

  const [error, setError] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(values));
    setValues({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowPassword2 = () => {
    setValues2({ ...values2, showPassword: !values2.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    //validateInput(e);
  };
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setValues2({ ...values2, [name]: value });
    //validateInput(e);
  };
  /*
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    validateInput(event);
  };
  const handleChange2 = (prop) => (event) => {
    setValues2({ ...values2, [prop]: event.target.value });
    validateInput(event);
  };
  */
  const checkBlur = (name, value) => {
    if (name === 'username' && value === '') {
      setError({ ...error, username: 'Please enter your username' });
    } else if (name === 'firstName' && value === '') {
      setError({ ...error, firstName: 'Please enter your First Name' });
    } else if (name === 'lastName' && value === '') {
      setError({ ...error, lastName: 'Please enter your Last Name' });
    } else if (name === 'email' && value === '') {
      setError({ ...error, email: 'Please enter your E-mail Address' });
    } else if (name === 'password' && value === '') {
      setError({ ...error, password: 'Please enter your Password' });
    } else if (values.confirmPassword && value !== values.confirmPassword) {
      setError({ ...error, confirmPassword: 'Passwords do not match!!' });
    } else if (name === 'confirmPassword' && value === '') {
      setError({
        ...error,
        confirmPassword: 'Please enter your Password Again',
      });
    } else if (values.password && value !== values.password) {
      setError({ ...error, confirmPassword: 'Passwords do not match!!' });
    }
  };
  const inputValidation = (e) => {
    let { name, value } = e.target;
    checkBlur(name, value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '50ch' },
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Container>
            <div>
              <IconTextField
                name="username"
                value={values.username}
                label="Username"
                iconStart={<VerifiedUserIcon />}
                onChange={handleChange}
                onBlur={inputValidation}
                required
              />
            </div>
            {error.username && <SpanStyled>{error.username}</SpanStyled>}
            <div>
              <IconTextField
                name="firstName"
                value={values.firstName}
                label="First Name"
                iconStart={<PersonIcon />}
                onChange={handleChange}
                onBlur={inputValidation}
                required
              />
            </div>
            {error.firstName && <SpanStyled>{error.firstName}</SpanStyled>}
            <div>
              <IconTextField
                name="lastName"
                value={values.lastName}
                label="Last Name"
                iconStart={<Person2Icon />}
                onChange={handleChange}
                onBlur={inputValidation}
                required
              />
            </div>
            {error.lastName && <SpanStyled>{error.lastName}</SpanStyled>}
            <div>
              <IconTextField
                name="email"
                value={values.email}
                label="E-mail"
                iconStart={<AlternateEmailIcon />}
                onChange={handleChange}
                onBlur={inputValidation}
                required
                type="email"
              />
            </div>
            {error.email && <SpanStyled>{error.email}</SpanStyled>}
            <div>
              <IconTextField
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={inputValidation}
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
            {error.password && <SpanStyled>{error.password}</SpanStyled>}
            <div>
              <IconTextField
                name="confirmPassword"
                value={values2.confirmPassword}
                onChange={handleChange2}
                onBlur={inputValidation}
                label=" Confirm Password"
                iconStart={
                  <IconButton
                    sx={{ color: 'blue' }}
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values2.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                }
                required
                type={values2.showPassword ? 'text' : 'password'}
              />
            </div>
            {error.confirmPassword && (
              <SpanStyled>{error.confirmPassword}</SpanStyled>
            )}
            <button>
              {auth.registerStatus === 'pending'
                ? 'Registering Your Data ... Please wait!'
                : 'Register'}
            </button>
            {auth.registerStatus === 'rejected' ? (
              <p>{auth.registerError}</p>
            ) : null}
            {auth.registerStatus === 'success' ? (
              <p>You have successfully registered</p>
            ) : null}
          </Container>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
