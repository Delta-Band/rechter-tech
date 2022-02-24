import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  creditsWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    '& p': {
      fontSize: 16
    }
  },
  brand: {
    marginInline: theme.spacing(1),
    // fontStyle: 'italic',
    '& .MuiButton-label': {
      transform: 'translateY(0px)'
    }
  },
  divider: {
    height: 1,
    width: '100%'
  }
}));

export default function Credits({ data }) {
  const classes = useStyles();

  return (
    <>
      <div
        className={classes.divider}
        style={{
          backgroundColor: data.textMainColor || '#FFF'
        }}
      />
      <div className={classes.creditsWrapper}>
        <Typography
          style={{
            color: data.textMainColor || '#000'
          }}
        >
          Made By
        </Typography>
        <Button
          target='_blank'
          rel='noreferrer'
          href='https://delta.band'
          className={classes.brand}
          style={{
            color: data.textMainColor || '#000'
          }}
        >
          Delta
        </Button>
        <Typography
          style={{
            color: data.textMainColor || '#000'
          }}
        >
          &amp;
        </Typography>
        <Button
          target='_blank'
          rel='noreferrer'
          href='https://rechter.co'
          className={classes.brand}
          style={{
            color: data.textMainColor || '#000'
          }}
        >
          Rechter
        </Button>
      </div>
    </>
  );
}
