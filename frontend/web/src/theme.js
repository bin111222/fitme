import { createTheme, alpha } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3B82F6', // Modern blue
      light: '#60A5FA',
      dark: '#2563EB',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#6366F1', // Indigo
      light: '#818CF8',
      dark: '#4F46E5',
      contrastText: '#FFFFFF',
    },
    accent: {
      main: '#F43F5E', // Rose
      light: '#FB7185',
      dark: '#E11D48',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8FAFC',
      paper: 'rgba(255, 255, 255, 0.9)',
      gradient: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)', // Soft blue gradient
    },
    text: {
      primary: '#1E293B',
      secondary: '#475569',
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Montserrat', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: '#1E293B',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      color: '#1E293B',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#1E293B',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1E293B',
    },
    button: {
      fontWeight: 600,
      fontSize: '1rem',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 24px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #3B82F6 30%, #6366F1 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #2563EB 30%, #4F46E5 90%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3B82F6',
              },
            },
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
          minHeight: '100vh',
        },
      },
    },
  },
});

export default theme;