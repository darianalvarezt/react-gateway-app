import React from 'react'
import { Toaster } from 'react-hot-toast'
import { CssBaseline, ThemeProvider } from '@mui/material'
import QueryProvider from './QueryContext'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const toasterOptions = {
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
}

export const AppProvider = ({ children }) => {

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <QueryProvider>
      <ThemeProvider theme={theme}>
          {children}
          <CssBaseline />
          <Toaster toastOptions={toasterOptions} />
      </ThemeProvider>
    </QueryProvider>
  )
}
