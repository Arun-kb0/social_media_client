import React, { useEffect, useState } from 'react'

import Notification from '../notification/Notification';
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { StyledPaper, StyledAvatar, StyledForm, StyledBox } from './styles';
import { signIn, signUp, socialAuth } from '../../redux/features/auth/authActions';

import {
  LoadingButton, Container, Typography, InputAdornment,
  IconButton, FormControl, TextField, Box, Button,
  OutlinedInput, InputLabel, FormHelperText
} from '../../imports/materialuiComponents';
import {
  VisibilityIcon, VisibilityOffIcon, PersonIcon
} from '../../imports/materialIcons';
import { SET_POSTS_OPEN } from '../../constants/actionTypes';


const Auth = () => {
  const initialDataState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const initialErrorState = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    isError: false
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setformData] = useState(initialDataState)
  const [isSignUp, setisSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [inputerror, setInputerror] = useState(initialErrorState)

  const { authData, loading, error } = useSelector(state => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()

    let isError = validateFrom()
    console.log(isError)
    console.log(inputerror)

    if (!isError) {
      // console.log(formData)
      console.log("loading", loading)
      isSignUp
        ? dispatch(signUp(formData))
        : dispatch(signIn(formData))
    }
  }
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateFrom = () => {
    const nameRegEx = /^[A-Za-z\s]+$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~@$!%*#?&])[A-Za-z\d~@$!%*#?&]{8,}$/;

    setInputerror((prev) => ({
      ...prev,
      firstName: isSignUp && !nameRegEx.test(formData.firstName),
      lastName: isSignUp && !nameRegEx.test(formData.lastName),
      password: !passwordRegex.test(formData.password),
      confirmPassword: isSignUp && formData.password !== formData.confirmPassword,

    }))

    const isError = (
      (isSignUp && !nameRegEx.test(formData.firstName)) ||
      (isSignUp && !nameRegEx.test(formData.lastName)) ||
      !passwordRegex.test(formData.password) ||
      (isSignUp && formData.password !== formData.confirmPassword)
    ) ? true : false

    return isError
  }

  const handleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  const switchMode = () => {
    setisSignUp(prev => !prev)
    handleShowPassword(false)
  }


  const googleSuccess = async (provider, data) => {
    dispatch(socialAuth(provider, data))
  }

  const googleFailed = (err) => {
    console.error(err)
  }

  useEffect(() => {
    if (authData)
      navigate('/')
  }, [authData])

  useEffect(() => {
    if (!authData)
      dispatch({ type: SET_POSTS_OPEN, payload: true })
  }, [])

  return (
    <StyledBox >

      <Container component={'div'} maxWidth='xs'>
        <StyledPaper elevation={4} >
          <StyledAvatar > <PersonIcon /> </StyledAvatar>
          <Typography variant='h5'>
            {isSignUp ? 'SignUp' : 'Sing In'}
          </Typography>

          <StyledForm onSubmit={handleSubmit} >
            <Box spacing={2} mb={2} >
              {isSignUp && (
                <Box display={'flex'} gap={1} mb={1}>
                  <TextField
                    required={true}
                    value={formData.firstName}
                    error={inputerror.firstName}
                    helperText={inputerror.firstName ? 'invalid First Name' : ''}
                    name='firstName'
                    label="First Name"
                    autoFocus
                    onChange={handleChange}
                  />

                  <TextField
                    required={true}
                    value={formData.lastName}
                    error={inputerror.lastName}
                    helperText={inputerror.lastName ? 'invalid Last Name' : ''}
                    name='lastName'
                    label="Last Name"
                    onChange={handleChange}
                  />
                </Box>
              )}
              <TextField
                name='email'
                label='Email Address'
                onChange={handleChange}
                required={true}
                value={formData.email}
                error={inputerror.email}
                helperText={inputerror.email ? 'invalid email' : ''}
                fullWidth
                sx={{ marginBottom: 1 }}
                type='email'
              />


              <FormControl variant='outlined' sx={{ width: '100%', marginBottom: 1 }} >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  name='password'
                  id='password'
                  label='Password'
                  type={showPassword ? 'text' : 'Password'}
                  fullWidth
                  required
                  value={formData.password}
                  error={inputerror.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                  onChange={handleChange}
                />
                {inputerror.password && (
                  <FormHelperText error>
                    Invaild password.
                  </FormHelperText>
                )}
              </FormControl>

              {isSignUp && (
                <TextField
                  name='confirmPassword'
                  label='Repaeat Password'
                  fullWidth
                  required={true}
                  value={formData.confirmPassword}
                  error={inputerror.confirmPassword}
                  helperText={inputerror.confirmPassword ? 'Enter same password as above.' : ''}
                  sx={{ marginBottom: 1 }}
                  onChange={handleChange}
                  type={'Password'}
                />
              )}
            </Box>

            <LoadingButton
              loading={loading}
              sx={{ marginBottom: 1 }}
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </LoadingButton >


            <LoginSocialGoogle
              client_id={'507276049803-nhpkn50iin125pt4f7dg1tujr24ce78d.apps.googleusercontent.com'}
              scope="openid profile email"
              discoveryDocs="claims_supported"
              access_type="offline"
              typeResponse='idToken'
              onLoginStart={() => console.log('google login start')}
              onResolve={({ provider, data }) => { googleSuccess(provider, data) }}
              onReject={(err) => { googleFailed(err) }}
            >
              <GoogleLoginButton />
            </LoginSocialGoogle>

            <Box container >
              <Button onClick={switchMode} >
                {isSignUp
                  ? 'Already have an accout ? Sign In'
                  : 'Dont have an account ? Sign Up'}
              </Button>
            </Box>

          </StyledForm>

        </StyledPaper>

        <Notification
          message={error?.message}
          isMessage={error ? true : false}
        />
      </Container>
    </StyledBox>
  )
}

export default Auth