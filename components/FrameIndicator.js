import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AnimateSharedLayout, motion } from 'framer-motion';
import cx from 'classnames';

const useStyles = makeStyles(theme => ({
  frameIndicatorWrapper: {
    display: 'inline-flex',
    [theme.breakpoints.up('desktop')]: {
      display: 'flex',
      justifyContent: 'space-around',
      height: '40vh',
      // width: 300,
      paddingInline: theme.spacing(2)
    }
  },
  vertical: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBlock: theme.spacing(2)
  },
  circle: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    borderRadius: theme.spacing(1.5),
    border: '1px solid black',
    [theme.breakpoints.up('sm')]: {}
  },
  circleFull: {
    background: 'black',
    position: 'absolute',
    left: '50%',
    borderRadius: `${theme.spacing(1.5)}px !important`,
    marginLeft: `-${theme.spacing(1.5) / 2}px`
  },
  circleWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    paddingBlock: theme.spacing(1),
    paddingInline: theme.spacing(1),
    [theme.breakpoints.up('laptop')]: {
      paddingInline: theme.spacing(0),
      paddingBlock: theme.spacing(1)
    }
  }
}));

export default function FrameIndicator({ frames, vertical, visibleFrame }) {
  const classes = useStyles();
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AnimateSharedLayout>
      <div
        className={cx(classes.frameIndicatorWrapper, {
          [classes.vertical]: vertical
        })}
      >
        {frames.map(frame => (
          <div key={frame.id} className={classes.circleWrapper}>
            <div className={classes.circle} />
            {visibleFrame.id === frame.id && (
              <motion.div
                className={cx(classes.circle, classes.circleFull)}
                layoutId='selected'
              />
            )}
          </div>
        ))}
      </div>
    </AnimateSharedLayout>
  );
}
