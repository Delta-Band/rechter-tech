import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useScrollDirection } from 'react-use-scroll-direction';
import { motion, AnimatePresence } from 'framer-motion';
import cx from 'classnames';
import DesktopNavigation from './DesktopNavigation';
import { useRouter } from 'next/router';
import {
  FrameIndicator,
  Frame,
  RichText,
  Footer,
  CustomLinkButton
} from '../../components';
import DesktopMedia from './DesktopMedia';

const useStyles = makeStyles(theme => ({
  mainWrapper: {
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '12px'
    },
    '&::-webkit-scrollbar-thumb': {
      borderLeft: '10px solid black'
    }
  },
  innerWrapper: {
    paddingLeft: 200,
    minHeight: '100%',
    [theme.breakpoints.up('desktop')]: {
      paddingLeft: 300
    }
  },
  sideBar: {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100%',
    paddingInline: theme.spacing(3),
    paddingBlock: 20,
    width: '20vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    pointerEvents: 'none',
    [theme.breakpoints.up('desktop')]: {
      width: 300,
      paddingInline: theme.spacing(6)
    }
  },
  contentWrapper: {
    background: 'red',
    width: '70vw',
    margin: '0 auto',
    maxWidth: '100vw',
    transform: 'translateX(10%)',
    [theme.breakpoints.up('desktop')]: {
      width: '60vw',
      paddingInline: theme.spacing(6)
    },
    [theme.breakpoints.up('widescreen')]: {
      width: 1300,
      transform: 'unset',
      paddingInline: theme.spacing(6)
    }
  },
  logoImg: {
    height: '40px',
    pointerEvents: 'all',
    cursor: 'pointer'
  },
  frameWrapper: {
    paddingLeft: 'calc(50vw - 150px) !important',
    paddingRight: '5vw !important',
    minHeight: '100vh !important',
    [theme.breakpoints.up('desktop')]: {
      paddingLeft: 'calc(50vw - 167px) !important'
    }
  },
  richTxt: {
    maxWidth: 350,
    // paddingRight: 0,
    flexShrink: 0,
    '& .ql-size-large': {
      fontSize: 38,
      lineHeight: '44px',
      fontWeight: 200
    },
    '& .ql-size-huge': {
      fontSize: 38,
      lineHeight: '44px',
      fontWeight: 900
    },
    '& a': {
      color: theme.palette.link.primary,
      textDecoration: 'underline'
    },
    '& p': {
      marginBlock: theme.spacing(4),
      fontSize: '17px',
      lineHeight: '27px'
    }
  },
  footerWrapper: {
    background: 'black',
    width: '100vw',
    width: 'calc(100% - 24px)',
    marginLeft: theme.spacing(2),
    paddingLeft: 'calc(50vw + 8.5px)',
    paddingRight: '0',
    zIndex: 1,
    position: 'relative',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40
  },
  footerInner: {
    padding: 0,
    width: '80vh',
    maxWidth: '30vw',
    transform: 'translateX(-100%)',
    paddingInline: theme.spacing(3),
    paddingBlock: theme.spacing(8),
    borderRadius: 0
  }
}));

export default function DesktopLayout({ logo, frames, children, footer }) {
  const classes = useStyles();
  const [visibleFrameIndex, setVisibleFrameIndex] = useState(0);
  const router = useRouter();
  const [visibleFrame, setVisibleFrame] = useState(frames[visibleFrameIndex]);
  const [footerIsVisible, setFooterIsVisible] = useState(
    frames[visibleFrameIndex]
  );
  const { scrollTargetRef, scrollDirection } = useScrollDirection();

  useEffect(() => {
    setVisibleFrame(frames[visibleFrameIndex]);
  }, [visibleFrameIndex]);

  return (
    <motion.div
      className={classes.mainWrapper}
      ref={scrollTargetRef}
      animate={{
        backgroundColor: visibleFrame?.bgColor || '#FFF'
      }}
    >
      <div className={classes.innerWrapper}>
        {frames.map(frame => (
          <DesktopMedia
            key={frame.id}
            frame={frame}
            visibleFrame={visibleFrame}
          />
        ))}
        {frames.map((frame, i) => (
          <Frame
            key={frame.id}
            index={i}
            frame={frame}
            rootMargin='-50% 0px -50% 0px'
            onVisible={indx => {
              if (!scrollDirection) return;
              setVisibleFrameIndex(
                scrollDirection === 'UP'
                  ? Math.min(indx, visibleFrameIndex)
                  : Math.max(indx, visibleFrameIndex)
              );
            }}
            className={cx(classes.frameWrapper, 'frameWrapper')}
          >
            <div className={classes.richTxt}>
              <RichText html={frame.richTxt} />
              <CustomLinkButton frame={frame} />
            </div>
          </Frame>
        ))}
        <div className={classes.sideBar}>
          <AnimatePresence>
            {logo && (
              <>
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
                  <img
                    className={classes.logoImg}
                    src={logo}
                    alt='Quathealth Logo'
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75 }}
                >
                  <FrameIndicator
                    frames={frames}
                    vertical
                    visibleFrame={visibleFrame}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <div />
        </div>
        <DesktopNavigation mainNavItms={[]} footerIsVisible={footerIsVisible} />
        {children}
      </div>
      <div className={classes.footerWrapper}>
        <Footer
          data={footer}
          className={classes.footerInner}
          onShow={visible => {
            setFooterIsVisible(visible);
          }}
        />
      </div>
    </motion.div>
  );
}
