import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { InView } from 'react-intersection-observer';
import cx from 'classnames';
import { Reader, Iframe } from '@deltaband/delta-next-mui';
// import Credits from './Credits';
import Social from './Social';

const useStyles = makeStyles(theme => ({
  footerWrapper: {
    // padding: '0 !important',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    minHeight: 'unset !important',
    background: '#000',
    position: 'relative',
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
    width: '100vw',
    zIndex: 1,
    paddingInline: theme.spacing(6),
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(5)
  },
  linkTxt: {
    textDecoration: 'underline'
  },
  info: {
    '& > *': {
      // marginBottom: theme.spacing(1),
      lineHeight: '33px',
      display: 'block'
    },
    '& p': {
      fontSize: 16
    }
  },
  title: {
    marginBottom: theme.spacing(5)
  },
  copyrights: {
    marginBottom: theme.spacing(3),
    marginBottom: `${theme.spacing(5)}px !important`
  },
  madeBy: {
    margin: 0,
    marginTop: theme.spacing(2)
  }
}));

export default function Footer({ className, data, onShow = () => {} }) {
  const classes = useStyles();
  const [openReader, setOpenReader] = useState(false);

  return (
    <InView rootMargin='-100px 0px -100px 0px'>
      {({ inView, ref, entry }) => {
        // console.log(inView);
        onShow(inView);
        return (
          <footer
            ref={ref}
            id='footer'
            className={cx(classes.footerWrapper, className)}
            style={{
              backgroundColor: data.bgColor || '#000'
            }}
          >
            <div className={classes.info}>
              <Typography
                variant='h1'
                style={{
                  color: data.textMainColor || '#FFF'
                }}
                className={classes.title}
              >
                {data.title}
              </Typography>
              <a
                href={`mailto:${data.email}?Subject=${data.emailSubject}`}
                target='_blank'
                rel='noreferrer'
              >
                <Typography
                  style={{
                    color: data.textMainColor || '#FFF'
                  }}
                  className={classes.linkTxt}
                >
                  {data.email}
                </Typography>
              </a>
              <Typography
                style={{
                  color: data.textMainColor || '#FFF'
                }}
              >
                {data.address1}
              </Typography>
              {data.address2 && (
                <Typography
                  style={{
                    color: data.textMainColor || '#FFF'
                  }}
                >
                  {data.address2}
                </Typography>
              )}
              <Social data={data} />
              {data.legal && (
                <a
                  onClick={() => {
                    setOpenReader(data.legal);
                  }}
                >
                  <Typography
                    style={{
                      color: data.textMainColor || '#FFF',
                      lineHeight: 'inherit'
                    }}
                    className={classes.linkTxt}
                  >
                    Legal Information
                  </Typography>
                </a>
              )}
              {data.copyrights && (
                <Typography
                  style={{
                    color: data.textMainColor || '#FFF'
                  }}
                  className={classes.copyrights}
                >
                  ©{data.copyrights}
                </Typography>
              )}
            </div>
            {/* <Credits data={data} /> */}
            <Reader
              noBleed
              open={openReader}
              onClose={() => {
                setOpenReader(null);
              }}
            >
              <Iframe src={openReader} />
            </Reader>
          </footer>
        );
      }}
    </InView>
  );
}
