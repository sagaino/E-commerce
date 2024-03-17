"use client"

import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from 'react';

// ** Icons Imports
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import AuthService from '@/services/authServices';
import { LoginResponseType, LoginTypes } from '@/services/type/auth';
import CustomToast from '@/utils/ui/toast';
import CacheManager from '@/utils/CacheManager';
import { UserDataType } from '@/services/type/user';

interface State {
  username: string
  password: string
  showPassword: boolean
}

const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh',
  '& .content-center': {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },
}))

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [values, setValues] = useState<State>({
    username: '',
    password: '',
    showPassword: false
  })

  const theme = useTheme()
  const router = useRouter()

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleSubmitLogin = async () => {
    try {
      setIsLoading(() => true)

      if (!values.username || !values.password) {
        return CustomToast.Error('Username or password is required')
      }

      if (values.username.length < 8 || values.password.length < 8) {
        return CustomToast.Error('Username or password must be at least 8 characters')
      }

      const payload: LoginTypes = {
        username: values.username,
        password: values.password,
      }
      const response: LoginResponseType = await AuthService.login(payload)
      CacheManager.setUserData<UserDataType>({
        username: payload.username,
        token: response.token
      })
      CustomToast.Success('Successfully logged in')
      router.replace('/')
    } catch (error: any) {
      CustomToast.Error(error)
    } finally {
      setIsLoading(() => false)
    }
  }

  return (
    <BlankLayoutWrapper>
      <Box className='app-content' sx={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
        <Box className='content-center'>
          <Card sx={{ zIndex: 1 }}>
            <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
              <Box sx={{ mb: 6 }}>
                <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                  Welcome to E-commerce! 👋🏻
                </Typography>
                <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
              </Box>
              <TextField autoFocus fullWidth id='username' label='Username' sx={{ marginBottom: 4 }} onChange={handleChange('username')} />
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={values.password}
                  id='auth-login-password'
                  onChange={handleChange('password')}
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
                disabled={isLoading}
                fullWidth
                size='large'
                variant='contained'
                sx={{ marginBottom: 7, mt: 4 }}
                onClick={handleSubmitLogin}
              >
                Login
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </BlankLayoutWrapper>
  )
}

export default LoginPage