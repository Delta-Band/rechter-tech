import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import cx from 'classnames';
import { useScrollDirection } from 'react-use-scroll-direction';
import NavBar from '../mobile/NavBar';
import {
  Frame,
  RichText,
  Footer,
  Media,
  CustomLinkButton
} from '../../components';
import * as consts from '../consts';

const useStyles = makeStyles(theme => ({
  mainWrapper: {
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'auto'
  },
  topBar: {
    height: 65,
    width: '100%',
    paddingInlineStart: theme.spacing(4),
    paddingInlineEnd: theme.spacing(2),
    paddingBlock: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1
  },
  richTxt: {
    flexShrink: 0,
    '& .ql-size-large': {
      fontSize: 34,
      lineHeight: '36px',
      fontWeight: 200
    },
    '& .ql-size-huge': {
      fontSize: 34,
      lineHeight: '36px',
      fontWeight: 'bold'
    },
    '& a': {
      color: theme.palette.link.primary,
      textDecoration: 'underline'
    },
    '& p': {
      marginBlock: theme.spacing(4),
      ontSize: 16,
      lineHeight: '22px'
    }
  },
  contentWrapper: {
    background: 'red',
    height: '100%',
    width: '100%',
    height: '100%',
    overflow: 'auto'
  },
  logoImg: {
    height: '100%',
    zIndex: 1
  },
  hamburger: {
    zIndex: 1
  },
  frameWrapper: {
    // minHeight: 'unset !important',
    paddingInline: theme.spacing(21),
    paddingTop: theme.spacing(0)
    // '&:first-child': {
    // }
  },
  media: {
    position: 'relative !important'
  },
  footer: {
    borderTopRightRadius: '0px !important',
    borderTopLeftRadius: '30px !important',
    paddingBottom: theme.spacing(2)
  }
}));

export default function IpadLayout({ logo, frames, children, footer }) {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const [visibleFrameIndex, setVisibleFrameIndex] = useState(0);
  const [visibleFrame, setVisibleFrame] = useState(frames[visibleFrameIndex]);
  const { scrollTargetRef, scrollDirection } = useScrollDirection();
  const [footerIsVisible, setFooterIsVisible] = useState(
    frames[visibleFrameIndex]
  );

  useEffect(() => {
    setVisibleFrame(frames[visibleFrameIndex]);
  }, [visibleFrameIndex]);

  return visibleFrame ? (
    <motion.div
      className={classes.mainWrapper}
      ref={scrollTargetRef}
      animate={{
        backgroundColor: visibleFrame.bgColor
      }}
    >
      {frames.map((frame, i) => (
        <Frame
          key={frame.id}
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
          index={i}
          className={cx(classes.frameWrapper, 'frameWrapper')}
        >
          <Media
            frame={frame}
            visibleFrame={visibleFrame}
            className={classes.media}
          />
          <div>
            <RichText html={frame.richTxt} className={classes.richTxt} />
            <CustomLinkButton frame={frame} />
          </div>
        </Frame>
      ))}
      <Footer
        className={classes.footer}
        data={footer}
        onShow={visible => {
          setFooterIsVisible(visible);
        }}
      />
      <NavBar logo={logo} frames={frames} visibleFrame={visibleFrame} />
      <div>{children}</div>
    </motion.div>
  ) : null;
}
