import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion, AnimatePresence } from 'framer-motion';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Squash as Hamburger } from 'hamburger-react';
import { useScrollDirection } from 'react-use-scroll-direction';
import cx from 'classnames';
import { useWindowSize } from '../../hooks';
import { useRouter } from 'next/router';
import {
  FrameIndicator,
  Menu,
  Frame,
  RichText,
  Footer,
  MediaMobile,
  CustomLinkButton
} from '../../components';
import * as consts from '../consts';

const useStyles = makeStyles(theme => ({
  mainWrapper: {
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'auto'
    // paddingLeft: theme.spacing(7)
    // paddingRight: theme.spacing(0)
  },
  innerWrapper: {
    minHeight: '-webkit-fill-available'
  },
  sideBar: {
    height: '100%',
    width: 65,
    position: 'fixed',
    left: 0,
    top: 0,
    flexShrink: 0,
    paddingBlock: theme.spacing(1.5),
    paddingInline: theme.spacing(1.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
    pointerEvents: 'none'
  },
  logoImg: {
    width: '100%',
    zIndex: 1,
    position: 'relative',
    pointerEvents: 'all'
  },
  hamburger: {
    zIndex: 1,
    pointerEvents: 'all'
  },
  media: {
    width: '80vh',
    height: '80vh',
    flexShrink: 0,
    position: 'fixed',
    left: 'calc(50vw + 32.5px)',
    top: '50%',
    pointerEvents: 'none',
    maxHeight: '40vw',
    maxWidth: '40vw',
    '& img': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0
    }
  },
  frameWrapper: {
    paddingLeft: 'calc(50vw + 65px) !important',
    paddingRight: '0px !important'
  },
  richTxt: {
    paddingRight: '10vw',
    paddingLeft: theme.spacing(3),
    flexShrink: 0,
    '& .ql-size-large': {
      fontSize: 24,
      lineHeight: '28px',
      fontWeight: 200
    },
    '& .ql-size-huge': {
      fontSize: 24,
      lineHeight: '28px',
      display: 'inline-block',
      fontWeight: 600
    },
    '& a': {
      color: theme.palette.link.primary,
      textDecoration: 'underline'
    },
    '& p': {
      marginBlock: theme.spacing(3),
      fontSize: 14,
      lineHeight: '20px'
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 350,
      paddingRight: 0,
      '& .ql-size-large': {
        fontSize: 34,
        lineHeight: '38px',
        fontWeight: 200
      },
      '& .ql-size-huge': {
        fontSize: 34,
        lineHeight: '38px',
        fontWeight: 900
      },
      '& p': {
        fontSize: 16,
        lineHeight: '22px'
      }
    }
  },
  footer: {
    marginLeft: 66,
    width: 'calc(100vw - 66px - 16px) !important',
    borderTopRightRadius: '10px !important',
    borderTopLeftRadius: '30px !important',
    paddingBottom: theme.spacing(1)
  },
  customLinkBtn: {
    paddingRight: '10vw',
    paddingLeft: theme.spacing(3),
    width: '100%'
  }
}));

const variants = {
  enter: {
    zIndex: 0,
    opacity: 0
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: {
    zIndex: 0,
    opacity: 0
  }
};

export default function MobileLandscape({ logo, frames, children, footer }) {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const [visibleFrameIndex, setVisibleFrameIndex] = useState(0);
  const [visibleFrame, setVisibleFrame] = useState(frames[visibleFrameIndex]);
  const mediaRef = useRef();
  const windowSize = useWindowSize();
  const { scrollTargetRef, scrollDirection } = useScrollDirection();
  const upIpad = useMediaQuery('(min-width:765px)');
  const router = useRouter();

  useEffect(() => {
    const mediaEl = mediaRef.current;
    const mediaRect = mediaEl.getBoundingClientRect();
    mediaEl.style.marginTop = -(mediaRect.height / 2) + 'px';
    mediaEl.style.marginLeft = -mediaRect.width + 'px';
  }, [windowSize.width, windowSize.height]);

  useEffect(() => {
    setVisibleFrame(frames[visibleFrameIndex]);
  }, [visibleFrameIndex]);

  return (
    <motion.div
      className={classes.mainWrapper}
      ref={scrollTargetRef}
      id='mainWrapper'
      animate={{
        backgroundColor: visibleFrame?.bgColor || '#FFF'
      }}
    >
      <div className={classes.innerWrapper}>
        <div className={classes.media} ref={mediaRef}>
          {frames.map(frame => (
            <MediaMobile
              key={frame.id}
              frame={frame}
              show={visibleFrame.id === frame.id}
            />
          ))}
        </div>
        {frames.map((frame, i) => (
          <Frame
            key={frame.id}
            frame={frame}
            onVisible={indx => {
              if (!scrollDirection) return;
              setVisibleFrameIndex(
                scrollDirection === 'UP'
                  ? Math.min(indx, visibleFrameIndex)
                  : Math.max(indx, visibleFrameIndex)
              );
            }}
            index={i}
            className={cx(classes.frameWrapper, 'frameWrapper')}
          >
            <RichText html={frame.richTxt} className={classes.richTxt} />
            <div className={classes.customLinkBtn}>
              <CustomLinkButton frame={frame} />
            </div>
          </Frame>
        ))}
      </div>
      <Footer className={classes.footer} data={footer} />
      <div className={classes.sideBar}>
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
            >
              <FrameIndicator
                frames={frames}
                vertical
                visibleFrame={visibleFrame}
              />
            </motion.div>
          )}
        </AnimatePresence>
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
          open={isOpen}
          close={() => {
            setOpen(false);
          }}
          items={[]}
          horizontal
        />
      </div>
      {children}
    </motion.div>
  );
}
