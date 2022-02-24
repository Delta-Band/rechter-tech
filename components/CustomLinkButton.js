import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  customlinkbuttonWrapper: {
    borderRadius: 0,
    borderInline: '1px solid',
    color: theme.palette.link.primary,
    paddingInline: theme.spacing(3),
    textTransform: 'capitalize',
    marginBlockStart: theme.spacing(1.5),
    '& .MuiButton-label': {
      transform: 'translateY(0)'
    }
  },
  bracketEdge: {
    position: 'absolute',
    width: theme.spacing(1),
    '&:nth-child(1)': {
      left: -24,
      top: -6,
      borderTop: '1px solid'
    },
    '&:nth-child(2)': {
      right: -24,
      top: -6,
      borderTop: '1px solid'
    },
    '&:nth-child(3)': {
      right: -24,
      bottom: -6,
      borderBottom: '1px solid'
    },
    '&:nth-child(4)': {
      left: -24,
      bottom: -6,
      borderBottom: '1px solid'
    }
  }
}));

export default function CustomLinkButton({ frame }) {
  const classes = useStyles();
  if (
    frame.customLinkVisible === 'yes' &&
    frame.customLink &&
    frame.customLinkLable
  ) {
    return (
      <Button
        className={classes.customlinkbuttonWrapper}
        href={frame.customLink}
        color='secondary'
        target={
          frame.openWhere.toLowerCase() === 'new tab' ? '_blank' : undefined
        }
      >
        <div className={classes.bracketEdge} />
        <div className={classes.bracketEdge} />
        <div className={classes.bracketEdge} />
        <div className={classes.bracketEdge} />
        {frame.customLinkLable}
      </Button>
    );
  } else {
    return null;
  }
}
