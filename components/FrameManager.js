import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useScrollDirection } from 'react-use-scroll-direction';

const useStyles = makeStyles(theme => ({
  framemanagerWrapper: {}
}));

export default function Framemanager({ children }) {
  const classes = useStyles();
  const { scrollTargetRef, scrollDirection } = useScrollDirection();

  return <div className={classes.framemanagerWrapper}>Framemanager</div>;
}
