import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@mui/material';
import { CookieBite as CookiesIcon } from '@styled-icons/fa-solid/CookieBite';
import { AnimatePresence, motion } from 'framer-motion';

const useStyles = makeStyles(theme => ({
  WeUseCookiesWrapper: {
    width: '100%',
    padding: theme.spacing(2),
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 1,
    background: 'transparent'
  },
  cookisInner: {
    background: '#1976d2',
    // color: 'white',
    textAlign: 'center',
    borderRadius: theme.spacing(1.5),
    paddingBlock: theme.spacing(2),
    paddingInline: theme.spacing(2.5),
    textTransform: 'none',
    textAlign: 'left',
    fontWeight: 100,
    letterSpacing: 'unset',
    lineHeight: 1.5,
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& p': {
      margin: 0,
      marginBlockStart: theme.spacing(1.5)
    }
  }
}));

export default function WeUseCookies() {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(!Boolean(localStorage.getItem('hideCookies')));
  }, []);

  function hide() {
    localStorage.setItem('hideCookies', true);
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={classes.WeUseCookiesWrapper}
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: '0%' }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ duration: 1 }}
        >
          <Button
            className={classes.cookisInner}
            fullWidth
            size='small'
            color='primary'
            variant='contained'
            onClick={hide}
          >
            <CookiesIcon size={34} />
            <p>
              This website uses cookies to ensure you get the best experience
              possible.
            </p>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
