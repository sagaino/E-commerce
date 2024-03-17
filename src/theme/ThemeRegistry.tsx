'use client';
import React from 'react'
import { Roboto } from 'next/font/google';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import palette from './palette'
import spacing from './spacing'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: palette(),
  ...spacing,
}

const theme = createTheme(themeOptions);

const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider
        theme={theme}
      >
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}

export default ThemeRegistry