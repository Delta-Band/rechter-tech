import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AnimatePresence } from 'framer-motion';
import { useWindowSize } from '../../hooks';
import { MediaMobile } from '../../components';

const useStyles = makeStyles(theme => ({
  desktopmediaWrapper: {
    width: '80vh',
    height: '80vh',
    flexShrink: 0,
    position: 'fixed',
    left: 'calc(50vw + 32.5px)',
    top: '50%',
    maxHeight: '30vw',
    maxWidth: '30vw',
    pointerEvents: 'none',
    '& img': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0
    }
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

export default function DesktopMedia({ frame, visibleFrame }) {
  const classes = useStyles();
  const windowSize = useWindowSize();
  const mediaRef = useRef();

  useEffect(() => {
    const mediaEl = mediaRef.current;
    const mediaRect = mediaEl.getBoundingClientRect();
    mediaEl.style.marginTop = -(mediaRect.height / 2) + 'px';
    mediaEl.style.marginLeft = -mediaRect.width + 'px';
    // console.log(mediaRect.width);
  }, [windowSize.width, windowSize.height]);

  return (
    <div className={classes.desktopmediaWrapper} ref={mediaRef}>
      <MediaMobile
        key={frame.id}
        frame={frame}
        show={visibleFrame.id === frame.id}
      />
    </div>
  );
}
