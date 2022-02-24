import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from 'react-use-scroll-direction';
import { useWindowSize } from '../../hooks';
import cx from 'classnames';
import NavBar from './NavBar';
import {
  Frame,
  RichText,
  Footer,
  MediaMobile,
  CustomLinkButton
} from '../../components';

const useStyles = makeStyles(theme => ({
  mainWrapper: {
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'auto'
  },
  innerWrapper: {
    minHeight: '-webkit-fill-available'
  },
  media: {
    width: `calc(100vw - ${theme.spacing(5)}px)`,
    height: `calc(100vw - ${theme.spacing(5)}px)`,
    flexShrink: 0,
    position: 'fixed',
    left: '50%',
    top: theme.spacing(6.5),
    transform: 'translate(-50%, 0)',
    pointerEvents: 'none',
    '& img': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0
    }
  },
  frameWrapper: {
    position: 'relative',
    zIndex: 1,
    paddingTop: `calc(100vw - ${theme.spacing(5)}px) !important`,
    '&:first-child': {
      paddingTop: `calc(100vw + ${theme.spacing(2)}px) !important`
    }
  },
  richTxt: {
    flexShrink: 0,
    '& .ql-size-large': {
      fontSize: 24,
      lineHeight: '28px',
      fontWeight: 200
    },
    '& .ql-size-huge': {
      fontSize: 24,
      lineHeight: '28px',
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
    }
  },
  footer: {
    borderTopRightRadius: '0px !important',
    borderTopLeftRadius: '30px !important',
    paddingBottom: theme.spacing(2)
  }
}));

export default function MobileLayout({ logo, frames, children, footer }) {
  const classes = useStyles();
  const [rendered, setRendered] = useState(false);
  const [visibleFrameIndex, setVisibleFrameIndex] = useState(0);
  const [overlappingFrames, setOverlappingFrames] = useState([]);
  const [visibleFrame, setVisibleFrame] = useState(frames[visibleFrameIndex]);
  const { scrollTargetRef, scrollDirection } = useScrollDirection();
  const [footerIsVisible, setFooterIsVisible] = useState(
    frames[visibleFrameIndex]
  );
  const windowSize = useWindowSize();

  useEffect(() => {
    setVisibleFrame(frames[visibleFrameIndex]);
  }, [visibleFrameIndex]);

  useEffect(() => {
    setRendered(true);
  }, []);

  return (
    <motion.div
      className={classes.mainWrapper}
      ref={scrollTargetRef}
      animate={{
        backgroundColor: visibleFrame?.bgColor || '#FFF'
      }}
    >
      <div className={classes.innerWrapper}>
        {frames.map((frame, i) => (
          <Frame
            rootMargin={`-${windowSize.height / 2.05 || 400}px 0px -${
              windowSize.height / 2.05 || 400
            }px 0px`}
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
            onOverlap={isOverlapping => {
              if (!rendered) return;
              if (isOverlapping && !overlappingFrames.includes(frame.id)) {
                setOverlappingFrames(overlappingFrames.concat([frame.id]));
              } else if (
                !isOverlapping &&
                overlappingFrames.includes(frame.id)
              ) {
                setOverlappingFrames(
                  overlappingFrames.filter(_frame => _frame !== frame.id)
                );
              }
            }}
            index={i}
            className={cx(classes.frameWrapper, 'frameWrapper')}
          >
            <div>
              <RichText html={frame.richTxt} className={classes.richTxt} />
              <CustomLinkButton frame={frame} />
            </div>
          </Frame>
        ))}
        {frames.map(frame => (
          <div className={classes.media} key={frame.id}>
            <MediaMobile
              frame={frame}
              show={
                visibleFrame.id === frame.id &&
                !overlappingFrames.includes(frame.id)
              }
            />
          </div>
        ))}
      </div>
      <NavBar
        logo={logo}
        frames={frames}
        visibleFrame={visibleFrame}
        footerIsVisible={footerIsVisible}
      />
      <Footer
        className={classes.footer}
        data={footer}
        onShow={visible => {
          setFooterIsVisible(visible);
        }}
      />
      {children}
    </motion.div>
  );
}
