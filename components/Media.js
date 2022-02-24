import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import cx from 'classnames';

const useStyles = makeStyles(theme => ({
  media: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  }
}));

export default function Media({ frame, visibleFrame, className }) {
  const classes = useStyles();
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current) {
      if (visibleFrame.id === frame.id) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [visibleFrame.id, frame.id]);

  return (
    <>
      {frame.mediaType === 'image' && (
        <motion.img
          src={frame.media}
          alt='mdia'
          className={cx(classes.media, className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      {frame.mediaType === 'mp4' && (
        <motion.video
          ref={videoRef}
          playsInline
          muted
          loop
          preload
          className={cx(classes.media, className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0
            // transition: {
            //   duration: 0
            // }
          }}
        >
          <source src={frame.media} type='video/mp4' />
          Your browser does not support the video tag.
        </motion.video>
      )}
    </>
  );
}
