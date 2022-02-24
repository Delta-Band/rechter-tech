import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import { Home as HomeIcon } from '@styled-icons/foundation/Home';
import { InfoCircleFill as ContactIcon } from '@styled-icons/bootstrap/InfoCircleFill';
import Link from 'next/link';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import cx from 'classnames';

const useStyles = makeStyles(theme => ({
  desktopnavigationWrapper: {
    paddingInline: theme.spacing(3),
    background: 'black',
    width: '80vh',
    maxWidth: '30vw',
    height: '78px',
    position: 'fixed',
    top: 0,
    left: 'calc(50vw + 32.5px)',
    borderBottomLeftRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  linkTxt: {
    transform: 'translateY(1px)',
    marginLeft: theme.spacing(1)
  },
  mainNavItms: {
    display: 'flex',
    // justifyContent: 'space-around',
    width: '100%',
    '& > *': {
      marginRight: theme.spacing(3)
    },
    '& > *:last-child': {
      marginRight: theme.spacing(0)
    }
  }
}));

export default function DesktopNavigation({
  mainNavItms = [],
  footerIsVisible = false
}) {
  const classes = useStyles();
  const router = useRouter();
  const [active, setActive] = useState('home');
  // console.log(footerIsVisible);

  useEffect(() => {
    if (footerIsVisible) {
      setActive('contact');
    } else {
      switch (router.pathname) {
        case '/':
          setActive('home');
          break;
        default:
          setActive(router.pathname);
      }
    }
  }, [footerIsVisible, router.pathname]);

  return (
    <motion.div
      className={classes.desktopnavigationWrapper}
      initial={{
        x: '-100%',
        y: '-100%'
      }}
      animate={{
        y: '0%'
      }}
      transition={{
        y: { type: 'spring', stiffness: 300, damping: 30, delay: 1 }
      }}
    >
      <div className={classes.mainNavItms}>
        <Link href='/'>
          <a>
            <motion.div animate={{ opacity: active === 'home' ? 1 : 0.4 }}>
              <Button
                onClick={() => {
                  const firstFrameElement =
                    document.getElementsByClassName('frameWrapper')[0];
                  if (firstFrameElement) {
                    setTimeout(() => {
                      document
                        .getElementsByClassName('frameWrapper')[0]
                        .scrollIntoView({ behavior: 'smooth' });
                    });
                  }
                }}
              >
                <HomeIcon size={20} />
                <span className={cx(classes.linkTxt, 'gtm-menu-btn')}>
                  Home
                </span>
              </Button>
            </motion.div>
          </a>
        </Link>
        {mainNavItms.map(navItm => (
          <Link href={`/${navItm.toLowerCase()}`} key={navItm}>
            <a>
              <motion.div
                animate={{
                  opacity:
                    router.pathname === `/${navItm.toLowerCase()}` ? 1 : 0.4
                }}
              >
                <Button className='gtm-menu-btn'>{navItm}</Button>
              </motion.div>
            </a>
          </Link>
        ))}
        <motion.div animate={{ opacity: active === 'contact' ? 1 : 0.4 }}>
          <Button
            onClick={() => {
              setTimeout(() => {
                document
                  .getElementById('footer')
                  .scrollIntoView({ behavior: 'smooth' });
              });
            }}
            // color={router.pathname === '/' ? 'primary' : 'secondary'}
          >
            <ContactIcon size={18} />
            <span className={cx(classes.linkTxt, 'gtm-menu-btn')}>Contact</span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
