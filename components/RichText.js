import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import { Typography } from '@mui/material';

const useStyles = makeStyles(() => ({
  richTxt: {
    '& .ql-size-huge': {
      textTransform: 'uppercase'
    }
  }
}));

export default function Richtext({ html, className }) {
  const classes = useStyles();

  return (
    <Typography
      className={cx(classes.richTxt, className)}
      component='div'
      dangerouslySetInnerHTML={{
        __html: html
      }}
    ></Typography>
  );
}
