export const theme = {
  colors: {
    primary: {
      main: '#00ff9f', // neon green
      light: '#33ffb5',
      dark: '#00cc7f',
    },
    secondary: {
      main: '#00d1ff', // electric blue
      light: '#33dbff',
      dark: '#00a7cc',
    },
    accent: {
      main: '#ff6b6b', // coral pink
      light: '#ff8989',
      dark: '#cc5555',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f5f5f5',
      gradient: 'linear-gradient(135deg, #e6e6fa 0%, #ffd6cc 100%)', // lavender to peach
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      light: '#999999',
    },
  },
  typography: {
    fontFamily: {
      primary: "'Poppins', sans-serif",
      secondary: "'Montserrat', sans-serif",
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
    xl: '0 20px 25px rgba(0,0,0,0.1)',
  },
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  glassmorphism: {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  animation: {
    transition: 'all 0.3s ease',
    hover: {
      scale: 'scale(1.02)',
      shadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
  },
};

export const GlobalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.typography.fontFamily.primary};
    color: ${theme.colors.text.primary};
    background: ${theme.colors.background.primary};
    line-height: 1.5;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    transition: ${theme.animation.transition};
    
    &:hover {
      transform: ${theme.animation.hover.scale};
    }
  }

  input, textarea {
    font-family: ${theme.typography.fontFamily.primary};
    border: none;
    outline: none;
    
    &:focus {
      box-shadow: 0 0 0 2px ${theme.colors.primary.main};
    }
  }
`;
