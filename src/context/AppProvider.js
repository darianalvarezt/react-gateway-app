import React from 'react'
import { Toaster } from 'react-hot-toast'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdapterDateFns  } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const queryCache = new QueryCache();
const mutationCache = new MutationCache();

const config = {
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
};

const queryClient = new QueryClient(config);

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

export default ({ children }) => {

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            {children}
            <CssBaseline />
            <Toaster toastOptions={toasterOptions} />
        </ThemeProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  )
}
