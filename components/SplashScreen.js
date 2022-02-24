import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useWindowOrientation from 'use-window-orientation';
import { motion } from 'framer-motion';

const useStyles = makeStyles(theme => ({
  splashscreenWrapper: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
    '@media (orientation: landscape)': {},
    [theme.breakpoints.up('ipad')]: {
      // height: 65,
      // paddingInlineEnd: theme.spacing(2),
      // justifyContent: 'flex-start'
    }
  },
  logo: {
    width: 35,
    position: 'absolute',
    left: theme.spacing(2),
    top: theme.spacing(2),
    zIndex: 1,
    '@media (orientation: landscape)': {},
    [theme.breakpoints.up('ipad')]: {
      // height: 65,
      // paddingInlineEnd: theme.spacing(2),
      // justifyContent: 'flex-start'
    }
  }
}));

export default function SplashScreen({ splash }) {
  const classes = useStyles();
  const [hide, setHide] = useState(false);
  const ipad = useMediaQuery(theme => theme.breakpoints.up('ipad'));
  const laptop = useMediaQuery(theme => theme.breakpoints.up('laptop'));
  const desktop = useMediaQuery(theme => theme.breakpoints.up('desktop'));
  const { portrait } = useWindowOrientation();

  useEffect(() => {
    let timeout;
    if (!splash) return;
    timeout = setTimeout(() => {
      setHide(true);
    }, splash.time * 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [JSON.stringify(splash)]);

  return splash ? (
    <motion.div
      className={classes.splashscreenWrapper}
      style={{
        background: splash.bgColor || '#000'
      }}
      animate={{ x: hide ? '-100%' : 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
    >
      <img src={splash.topLeftLogo} alt='logo' className={classes.logo} />
      {splash.lottie && (
        <lottie-interactive
          autoplay=''
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute'
          }}
          path={splash.lottie}
          loop=''
          speed='1'
          delay='0'
          aspect-ratio='xMidYMid slice'
        />
      )}
    </motion.div>
  ) : null;
}
