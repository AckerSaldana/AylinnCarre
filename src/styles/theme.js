import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      light: '#333333',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#555555',
      light: '#7c7c7c',
      dark: '#2c2c2c',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
      disabled: '#999999',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    divider: '#eeeeee',
    error: {
      main: '#d32f2f',
    },
    success: {
      main: '#2e7d32',
    }
  },
  typography: {
    fontFamily: '"Open Sauce", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"DM Serif Display", serif',
      fontWeight: 400,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"DM Serif Display", serif',
      fontWeight: 400,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"DM Serif Display", serif',
      fontWeight: 400,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"DM Serif Display", serif',
      fontWeight: 400,
    },
    h5: {
      fontFamily: '"DM Serif Display", serif',
      fontWeight: 400,
    },
    h6: {
      fontFamily: '"DM Serif Display", serif',
      fontWeight: 400,
    },
    subtitle1: {
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
    subtitle2: {
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.9rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
    caption: {
      fontSize: '0.8rem',
      letterSpacing: '0.04em',
    },
    overline: {
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      fontSize: '0.75rem',
      fontWeight: 500,
    }
  },
  shape: {
    borderRadius: 0,
  },
  shadows: [
    'none',
    '0px 2px 8px rgba(0, 0, 0, 0.04)',
    '0px 4px 16px rgba(0, 0, 0, 0.06)',
    '0px 6px 20px rgba(0, 0, 0, 0.08)',
    '0px 8px 24px rgba(0, 0, 0, 0.1)',
    '0px 10px 28px rgba(0, 0, 0, 0.12)',
    ...Array(19).fill('none'), // Llenamos el resto con 'none'
  ],
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Open Sauce';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: url('/fonts/OpenSauce-Regular.woff2') format('woff2');
        }
        @font-face {
          font-family: 'Open Sauce';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: url('/fonts/OpenSauce-Medium.woff2') format('woff2');
        }
        @font-face {
          font-family: 'Open Sauce';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: url('/fonts/OpenSauce-SemiBold.woff2') format('woff2');
        }
        @font-face {
          font-family: 'Open Sauce';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: url('/fonts/OpenSauce-Bold.woff2') format('woff2');
        }
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');

        body {
          overflow: 'hidden auto',
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        body::-webkit-scrollbar {
          width: 8px;
          background: transparent;
        }
        body::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        body::-webkit-scrollbar-thumb:hover {
          background-color: rgba(0, 0, 0, 0.3);
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          textTransform: 'none',
          fontWeight: 500,
          letterSpacing: '0.02em',
          padding: '8px 24px',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        outlined: {
          borderWidth: '1px',
          '&:hover': {
            borderWidth: '1px',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          overflow: 'hidden',
          boxShadow: 'none',
          transition: 'all 0.4s ease',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          transition: 'transform 0.6s ease',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontWeight: 500,
          letterSpacing: '0.02em',
        },
        outlined: {
          borderWidth: '1px',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#eeeeee',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        },
        outlined: {
          borderColor: '#eeeeee',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontSize: '1rem',
          '& fieldset': {
            borderColor: '#dddddd',
            transition: 'border-color 0.3s ease',
          },
          '&:hover fieldset': {
            borderColor: '#999999',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#000000',
            borderWidth: '1px',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#999999',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000000',
            borderWidth: '1px',
          },
        },
        notchedOutline: {
          borderColor: '#dddddd',
          transition: 'border-color 0.3s ease',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.9rem',
          '&.Mui-focused': {
            color: '#000000',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid #eeeeee',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '72px',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '24px',
          paddingRight: '24px',
          '@media (min-width: 600px)': {
            paddingLeft: '32px',
            paddingRight: '32px',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          transition: 'color 0.3s ease',
          '&:hover': {
            textDecoration: 'none',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingTop: '8px',
          paddingBottom: '8px',
        },
      },
    },
  },
});

export default theme;