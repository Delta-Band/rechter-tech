import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import cx from 'classnames';
import { Facebook as FacebookIcon } from '@styled-icons/boxicons-logos/Facebook';
import { Linkedin as LinkedinIcon } from '@styled-icons/boxicons-logos/Linkedin';
import { Twitter as TwitterIcon } from '@styled-icons/boxicons-logos/Twitter';

const useStyles = makeStyles(theme => ({
  socialWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2.5)
  },
  twitterAdjust: {
    '& svg': {
      transform: 'translate(1px, 0px)'
    }
  },
  linkedinAdjust: {
    '& svg': {
      transform: 'translate(0px, -2px)'
    }
  },
  facebookAdjust: {
    '& svg': {
      transform: 'translate(0px, -1px)'
    }
  },
  btn: {
    borderRadius: 20,
    height: 40,
    width: 40,
    minWidth: 'unset',
    // background: 'red',
    marginTop: 0,
    marginInlineEnd: theme.spacing(3)
    // '&:hover': {
    //   background: 'rgba(255, 255, 255, 0.1)'
    // }
  }
}));

export default function Social({ data }) {
  const classes = useStyles();
  // console.log(data);

  return (
    <div className={classes.socialWrapper}>
      {data.facebook && (
        <Button
          vairant='contained'
          target='_blank'
          href={data.facebook}
          size='small'
          color='secondary'
          className={cx(classes.btn, classes.facebookAdjust)}
          style={{
            color: data.bgColor || '#FFF',
            backgroundColor: data.textMainColor || '#000'
          }}
        >
          <FacebookIcon size={24} />
        </Button>
      )}
      {data.linkedin && (
        <Button
          href={data.linkedin}
          size='small'
          color='secondary'
          vairant='contained'
          target='_blank'
          className={cx(classes.btn, classes.linkedinAdjust)}
          style={{
            color: data.bgColor || '#FFF',
            backgroundColor: data.textMainColor || '#000'
          }}
        >
          <LinkedinIcon size={24} />
        </Button>
      )}
      {data.twitter && (
        <Button
          vairant='contained'
          size='small'
          href={data.twitter}
          target='_blank'
          color='secondary'
          className={cx(classes.btn, classes.twitterAdjust)}
          style={{
            color: data.bgColor || '#FFF',
            backgroundColor: data.textMainColor || '#000'
          }}
        >
          <TwitterIcon size={24} />
        </Button>
      )}
    </div>
  );
}
