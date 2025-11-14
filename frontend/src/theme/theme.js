import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d4ff', // Neon cyan
      light: '#5ee7ff',
      dark: '#00a8cc',
      contrastText: '#0a0e27',
    },
    secondary: {
      main: '#b026ff', // Neon purple
      light: '#d966ff',
      dark: '#8a1fcc',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a0e27', // Deep space black
      paper: '#151932', // Dark space blue
      gradient: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b4e 100%)',
      space: 'radial-gradient(ellipse at bottom, #1a1f3a 0%, #0a0e27 100%)',
    },
    text: {
      primary: '#e0e7ff', // Light space blue
      secondary: '#a5b4fc', // Medium space blue
      disabled: '#6366f1',
    },
    success: {
      main: '#00ff88', // Neon green
      light: '#5effaa',
      dark: '#00cc6a',
    },
    warning: {
      main: '#ffb800', // Neon yellow
      light: '#ffcc33',
      dark: '#cc9300',
    },
    error: {
      main: '#ff3366', // Neon red
      light: '#ff6699',
      dark: '#cc2852',
    },
    info: {
      main: '#00d4ff', // Neon cyan
      light: '#5ee7ff',
      dark: '#00a8cc',
    },
    grey: {
      50: '#1a1f3a',
      100: '#151932',
      200: '#0f1429',
      300: '#0a0e27',
      400: '#050820',
      500: '#030518',
      600: '#020310',
      700: '#010208',
      800: '#000104',
      900: '#000000',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: { 
      fontSize: '3.5rem', 
      fontWeight: 900, 
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
      textShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
    },
    h2: { 
      fontSize: '2.5rem', 
      fontWeight: 800, 
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
      textShadow: '0 0 15px rgba(0, 212, 255, 0.2)',
    },
    h3: { 
      fontSize: '2rem', 
      fontWeight: 700, 
      lineHeight: 1.3,
      letterSpacing: '-0.02em',
    },
    h4: { 
      fontSize: '1.5rem', 
      fontWeight: 700, 
      lineHeight: 1.4,
    },
    h5: { 
      fontSize: '1.25rem', 
      fontWeight: 600, 
      lineHeight: '1.4',
    },
    h6: { 
      fontSize: '1.125rem', 
      fontWeight: 600, 
      lineHeight: 1.4,
    },
    body1: { 
      fontSize: '1rem', 
      lineHeight: 1.7,
      fontWeight: 400,
    },
    body2: { 
      fontSize: '0.875rem', 
      lineHeight: 1.6,
      fontWeight: 400,
    },
    button: { 
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 500,
      letterSpacing: '0.1em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0 2px 8px rgba(0, 212, 255, 0.1)',
    '0 4px 16px rgba(0, 212, 255, 0.15)',
    '0 8px 24px rgba(0, 212, 255, 0.2)',
    '0 12px 32px rgba(0, 212, 255, 0.25)',
    '0 16px 40px rgba(0, 212, 255, 0.3)',
    '0 20px 48px rgba(0, 212, 255, 0.35)',
    '0 24px 56px rgba(0, 212, 255, 0.4)',
    '0 28px 64px rgba(0, 212, 255, 0.45)',
    '0 32px 72px rgba(0, 212, 255, 0.5)',
    '0 36px 80px rgba(0, 212, 255, 0.55)',
    '0 40px 88px rgba(0, 212, 255, 0.6)',
    '0 44px 96px rgba(0, 212, 255, 0.65)',
    '0 48px 104px rgba(0, 212, 255, 0.7)',
    '0 52px 112px rgba(0, 212, 255, 0.75)',
    '0 56px 120px rgba(0, 212, 255, 0.8)',
    '0 60px 128px rgba(0, 212, 255, 0.85)',
    '0 64px 136px rgba(0, 212, 255, 0.9)',
    '0 68px 144px rgba(0, 212, 255, 0.95)',
    '0 72px 152px rgba(0, 212, 255, 1)',
    '0 76px 160px rgba(0, 212, 255, 1)',
    '0 80px 168px rgba(0, 212, 255, 1)',
    '0 84px 176px rgba(0, 212, 255, 1)',
    '0 88px 184px rgba(0, 212, 255, 1)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '14px 28px',
          fontSize: '0.875rem',
          letterSpacing: '0.1em',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 212, 255, 0.4)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #00d4ff 0%, #b026ff 100%)',
          boxShadow: '0 4px 20px rgba(0, 212, 255, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5ee7ff 0%, #d966ff 100%)',
            boxShadow: '0 8px 32px rgba(0, 212, 255, 0.5)',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: '#00d4ff',
          color: '#00d4ff',
          '&:hover': {
            borderColor: '#5ee7ff',
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(21, 25, 50, 0.8) 0%, rgba(45, 27, 78, 0.6) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
            opacity: 0,
            transition: 'opacity 0.3s',
          },
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 16px 48px rgba(0, 212, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            borderColor: 'rgba(0, 212, 255, 0.5)',
            '&::before': {
              opacity: 1,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backgroundImage: 'none',
          background: 'linear-gradient(135deg, rgba(21, 25, 50, 0.95) 0%, rgba(45, 27, 78, 0.85) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 212, 255, 0.2)',
        },
        elevation1: {
          boxShadow: '0 4px 16px rgba(0, 212, 255, 0.15)',
        },
        elevation2: {
          boxShadow: '0 8px 24px rgba(0, 212, 255, 0.2)',
        },
        elevation3: {
          boxShadow: '0 12px 32px rgba(0, 212, 255, 0.25)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(10, 14, 39, 0.5)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            transition: 'all 0.3s',
            '& fieldset': {
              borderColor: 'rgba(0, 212, 255, 0.3)',
            },
            '&:hover': {
              backgroundColor: 'rgba(10, 14, 39, 0.7)',
              '& fieldset': {
                borderColor: 'rgba(0, 212, 255, 0.5)',
                borderWidth: '2px',
              },
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(10, 14, 39, 0.8)',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
              '& fieldset': {
                borderColor: '#00d4ff',
                borderWidth: '2px',
              },
            },
          },
          '& .MuiInputLabel-root': {
            color: '#a5b4fc',
            '&.Mui-focused': {
              color: '#00d4ff',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          background: 'rgba(0, 212, 255, 0.1)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          color: '#00d4ff',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          background: 'linear-gradient(135deg, #00d4ff 0%, #b026ff 100%)',
          boxShadow: '0 4px 16px rgba(0, 212, 255, 0.3)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(10, 14, 39, 0.8) !important',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 212, 255, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'linear-gradient(180deg, rgba(10, 14, 39, 0.95) 0%, rgba(21, 25, 50, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(0, 212, 255, 0.2)',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: '6px 12px',
          transition: 'all 0.3s',
          '&:hover': {
            background: 'rgba(0, 212, 255, 0.15)',
            transform: 'translateX(4px)',
            boxShadow: '0 4px 12px rgba(0, 212, 255, 0.2)',
          },
          '&.Mui-selected': {
            background: 'linear-gradient(90deg, rgba(0, 212, 255, 0.2) 0%, rgba(176, 38, 255, 0.2) 100%)',
            borderLeft: '3px solid #00d4ff',
            '&:hover': {
              background: 'linear-gradient(90deg, rgba(0, 212, 255, 0.3) 0%, rgba(176, 38, 255, 0.3) 100%)',
            },
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            background: 'rgba(0, 212, 255, 0.1)',
            fontWeight: 700,
            fontSize: '0.875rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#00d4ff',
            borderBottom: '2px solid rgba(0, 212, 255, 0.3)',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            background: 'rgba(0, 212, 255, 0.08)',
          },
          '&:nth-of-type(even)': {
            background: 'rgba(0, 212, 255, 0.03)',
          },
        },
      },
    },
  },
});

export default theme;
