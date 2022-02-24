import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import { Home as HomeIcon } from '@styled-icons/foundation/Home';
import { InfoCircleFill as ContactIcon } from '@styled-icons/bootstrap/InfoCircleFill';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cx from 'classnames';

const useStyles = makeStyles(theme => ({
  menuWrapper: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    background: 'black',
    display: 'flex',
    alignItems: 'center',
    paddingInline: theme.spacing(3)
  },
  list: {
    pointerEvents: 'all',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
      left: '50vw',
      transform: 'translateX(-50%)'
    }
  },
  linkTxt: {
    transform: 'translateY(1px)',
    marginLeft: theme.spacing(1),
    fontSize: 20
  },
  white: {
    color: 'white'
  }
}));

const container = {
  hidden: horizontal => ({
    y: horizontal ? 0 : '-100%',
    x: horizontal ? '-100%' : 0,
    transition: {
      when: 'afterChildren',
      type: 'spring',
      bounce: 0
    }
  }),
  show: {
    y: '0%',
    x: '0%',
    transition: {
      when: 'beforeChildren',
      type: 'spring',
      bounce: 0
    }
  }
};

const list = {
  hidden: {
    transition: {
      staggerChildren: 0.15,
      type: 'spring',
      bounce: 0,
      staggerDirection: -1
    }
  },
  show: {
    transition: {
      staggerChildren: 0.15,
      type: 'spring',
      bounce: 0
    }
  }
};

const listItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
};

export default function Menu({
  open,
  close,
  items,
  horizontal = false,
  footerIsVisible = false
}) {
  const classes = useStyles();
  const [active, setActive] = useState('home');
  const router = useRouter();

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
      className={classes.menuWrapper}
      variants={container}
      initial='hidden'
      animate={open ? 'show' : 'hidden'}
      custom={horizontal}
      transition={{ type: 'spring', bounce: 0 }}
    >
      <motion.ul variants={list} className={classes.list} onClick={close}>
        <motion.li variants={listItem}>
          <Link href='/'>
            <a>
              <motion.div animate={{ opacity: active === 'home' ? 1 : 0.4 }}>
                <Button
                  className={classes.white}
                  onClick={() => {
                    router.push('/');
                    const frirstFrameElement =
                      document.getElementsByClassName('frameWrapper')[0];
                    if (frirstFrameElement) {
                      setTimeout(() => {
                        frirstFrameElement.scrollIntoView({
                          behavior: 'smooth'
                        });
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
        </motion.li>
        {items.map(itm => (
          <motion.li key={itm} variants={listItem} onClick={close}>
            <Link href={`/${itm.toLowerCase()}`}>
              <a>
                <motion.div
                  animate={{
                    opacity:
                      router.pathname === `/${navItm.toLowerCase()}` ? 1 : 0.4
                  }}
                >
                  <Button className={classes.white}>
                    <span className={cx(classes.linkTxt, 'gtm-menu-btn')}>
                      {itm}
                    </span>
                  </Button>
                </motion.div>
              </a>
            </Link>
          </motion.li>
        ))}
        <motion.li variants={listItem} onClick={close}>
          <motion.div animate={{ opacity: active === 'contact' ? 1 : 0.4 }}>
            <Button
              className={classes.white}
              onClick={() => {
                setTimeout(() => {
                  document
                    .getElementById('footer')
                    .scrollIntoView({ behavior: 'smooth' });
                });
              }}
            >
              <ContactIcon size={18} />
              <span className={cx(classes.linkTxt, 'gtm-menu-btn')}>
                Contact
              </span>
            </Button>
          </motion.div>
        </motion.li>
      </motion.ul>
    </motion.div>
  );
}
