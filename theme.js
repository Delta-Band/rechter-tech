import { createTheme } from '@material-ui/core/styles';

const defaultTheme = createTheme();
const { breakpoints } = defaultTheme;

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      ipad: 765,
      laptop: 1024,
      desktop: 1280,
      widescreen: 1920
    }
  },
  palette: {
    primary: {
      light: '##ffd977',
      main: '#ffb800',
      dark: '#FFDACE',
      contrastText: '#07003C'
    },
    secondary: {
      light: '#507cf4',
      main: '#FFDACE',
      dark: '#1402c4',
      contrastText: '#fff'
    },
    success: {
      main: '#4caf50'
    },
    text: {
      primary: '#FFF',
      secondary: '#4f4f4f'
    },
    link: {
      primary: '#0039ff'
    },
    action: {
      // disabledBackground: 'set color of background here',
      disabled: 'rgb(255 255 255 / 18%)',
      selectedOpacity: 0.2
    }
  },
  typography: {
    fontFamily: 'GT America',
    lineHeight: 1.8,
    fontSize: 18,
    allVariants: {
      fontWeight: 400,
      color: '#000',
      fontFamily: 'GT America',
      lineHeight: 1.8
    },
    body1: {},
    subtitle1: {
      fontSize: '15px',
      lineHeight: 1,
      fontWeight: 400
    },
    subtitle2: {
      fontSize: '16px',
      fontWeight: 100
    },
    p: {
      padding: 0
    },
    button: {
      color: '#FFF'
    },
    caption: {
      color: '#ffb800'
    },
    h1: {
      fontSize: 32,
      fontWeight: 100,
      lineHeight: '40px',
      margin: 0,
      [breakpoints.up('xl')]: {
        fontSize: 48,
        lineHeight: '65px'
      }
    },
    h2: {
      fontSize: 24,
      lineHeight: 1.5,
      fontWeight: 300,
      marginBottom: 0
    },
    h3: {
      fontSize: 20,
      lineHeight: 1.5,
      fontWeight: 400,
      marginBottom: 0
    },
    h5: {
      fontSize: 20,
      lineHeight: 1.5,
      fontWeight: 300,
      marginBottom: 0
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': ['Zilla Slab']
      }
    },
    MuiLink: {
      underlineHover: {
        textDecoration: 'underline'
      }
    },
    //.MuiButton-containedSecondary
    MuiIconButton: {
      root: {
        transition: '0.3s ease-out',
        color: 'rgba(255, 255, 255, 1)',
        '&$disabled': {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      sizeSmall: {
        padding: 8
      },
      colorSecondary: {
        color: '#507cf4'
      }
    },
    MuiButton: {
      root: {
        transition: '0.3s ease-out',
        textDecoration: 'none !important'
      },
      label: {
        fontSize: 14,
        fontWeight: 400,
        [breakpoints.up('sm')]: {
          fontSize: 16
        }
      },
      contained: {
        borderRadius: 25,
        paddingLeft: 28,
        paddingRight: 28
        // '& > .MuiButton-label': {
        //   transform: 'translateY(1px)'
        // }
      },
      containedPrimary: {
        color: 'white',
        backgroundColor: 'black',
        '&:hover': {
          backgroundColor: 'black !important'
        }
      },
      containedSizeLarge: {
        [breakpoints.up('sm')]: {
          paddingLeft: 50,
          paddingRight: 50
        }
      },
      outlinedSizeSmall: {
        '& > .MuiButton-label': {
          fontSize: 13
        }
      },
      textSecondary: {
        color: '#FFDACE'
      },
      text: {
        marginTop: -1
        // '& > .MuiButton-label': {
        //   transform: 'translateY(1px)'
        // }
      },
      textSizeSmall: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 0,
        paddingBottom: 0
      },
      outlinedSecondary: {
        color: '#507cf4',
        borderColor: '#507cf4',
        '&:hover': {
          color: '#4431ff'
        }
      },
      outlined: {
        '& > .MuiButton-label': {
          transform: 'translateY(1px)'
        }
      },
      outlinedSizeSmall: {
        paddingTop: 2,
        paddingBottom: 2
        // '& > .MuiButton-label': {
        //   fontSize: 14
        // }
      }
    },
    MuiRadio: {
      root: {
        color: 'white'
      },
      colorPrimary: {
        color: 'white !important'
      }
    },
    MuiDropzoneArea: {
      root: {
        borderColor: '#507cf4'
      },
      text: {
        color: '#000',
        marginBottom: 8
      },
      icon: {
        color: '#507cf4',
        marginBottom: 8
      }
    },
    MuiDropzonePreviewList: {
      removeButton: {
        top: 11,
        right: 36
      }
    },
    MuiInput: {
      root: {
        background: '#FFF',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 4
      },
      underline: {
        '&:before': {
          borderBottom: 'none !important',
          color: '#4f4f4f'
        },
        '&:after': {
          borderBottom: 'none !important',
          color: '#4f4f4f'
        }
      }
    },
    MuiInputBase: {
      root: {
        fontWeight: 400,
        fontSize: 18
      },
      input: {
        color: '#4f4f4f',
        fontSize: 18
      }
    },
    MuiTab: {
      root: {
        '&.Mui-disabled': {
          opacity: '0.2 !important'
        }
      },
      textColorInherit: {
        opacity: 1,
        transition: '0.3s ease-out'
      },
      wrapper: {
        flexDirection: 'row-reverse'
      },
      labelIcon: {
        minHeight: 48,
        '& .MuiIconButton-root': {
          padding: 0,
          margin: 0,
          marginLeft: 8,
          marginBottom: '0 !important',
          marginTop: -4
        },
        '& .MuiTab-wrapper': {
          transform: 'translateY(-2px)',
          '&>*:first-child': {
            margin: 0
          }
        }
      }
    }
  },
  appBarHeight: 80
});

export default theme;
