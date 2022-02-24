import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Squash as Hamburger } from 'hamburger-react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import * as consts from '../consts';
import { FrameIndicator, Menu } from '../../components';

const useStyles = makeStyles(theme => ({
  navBarWrapper: {
    height: 50,
    width: '100%',
    paddingInlineStart: theme.spacing(2),
    paddingBlock: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 2,
    [theme.breakpoints.up('ipad')]: {
      height: 65,
      paddingInlineEnd: theme.spacing(2),
      justifyContent: 'flex-start'
    }
  },
  frameIdicatorOuter: {
    [theme.breakpoints.up('ipad')]: {
      marginLeft: 'auto',
      marginRight: theme.spacing(4)
    }
  },
  logoImg: {
    height: '100%',
    zIndex: 1
  },
  hamburger: {
    zIndex: 1,
    justifySelf: 'flex-end'
  }
}));

export default function NavBar({
  logo,
  frames,
  visibleFrame,
  footerIsVisible = false
}) {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const theme = useTheme();
  const upIpad = useMediaQuery('(min-width:765px)');
  const router = useRouter();

  return (
    <div className={classes.navBarWrapper}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.75 }}
        className={classes.logoImg}
        onClick={() => {
          router.push('/');
          setTimeout(() => {
            document
              .getElementsByClassName('frameWrapper')[0]
              .scrollIntoView({ behavior: 'smooth' });
          });
        }}
      >
        <AnimatePresence>
          {logo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75 }}
              className={classes.logoImg}
              onClick={() => {
                router.push('/');
                const frirstFrameElement =
                  document.getElementsByClassName('frameWrapper')[0];
                if (frirstFrameElement) {
                  setTimeout(() => {
                    frirstFrameElement.scrollIntoView({
                      behavior: 'smooth'
                    });
                  });
                }
              }}
            >
              <motion.img
                className={classes.logoImg}
                src={logo}
                alt='Quathealth Logo'
                variants={consts.INVERT_COLOR}
                initial='normal'
                animate={isOpen ? 'invert' : 'normal'}
              />
            </motion.div>
          )}
          {visibleFrame && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75 }}
              className={classes.frameIdicatorOuter}
            >
              <FrameIndicator frames={frames} visibleFrame={visibleFrame} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.75 }}
        className={classes.hamburger}
      >
        <motion.div
          variants={consts.INVERT_COLOR}
          initial='normal'
          animate={isOpen ? 'invert' : 'normal'}
        >
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={upIpad ? 24 : 20}
          />
        </motion.div>
      </motion.div>
      <Menu
        footerIsVisible={footerIsVisible}
        open={isOpen}
        close={() => {
          setOpen(false);
        }}
        items={[]}
      />
    </div>
  );
}
