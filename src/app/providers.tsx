'use client'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/store/store'

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a192f',
      paper: '#112240',
    },
    primary: {
      main: '#64ffda',
    },
    secondary: {
      main: '#8892b0',
    },
    text: {
      primary: '#ccd6f6',
      secondary: '#8892b0',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#ccd6f6',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#ccd6f6',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#ccd6f6',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#ccd6f6',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#ccd6f6',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#ccd6f6',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '1rem',
          paddingRight: '1rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '1.5rem',
          backgroundColor: '#112240',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#64ffda',
          height: 8,
        },
        thumb: {
          height: 24,
          width: 24,
          backgroundColor: '#fff',
          '&:hover, &.Mui-focusVisible': {
            boxShadow: '0 0 0 8px rgba(100, 255, 218, 0.16)',
          },
        },
        track: {
          height: 8,
          borderRadius: 4,
        },
        rail: {
          height: 8,
          borderRadius: 4,
          opacity: 0.5,
        },
      },
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ReduxProvider>
  )
} 