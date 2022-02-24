import React, { useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useWindowOrientation from 'use-window-orientation';
import reactor from '../reactor';
import {
  DesktopLayout,
  MobileLayout,
  MobileLandscapeLayout,
  IpadLayout
} from '../layouts';

let unmounting = false;

export default function PageLayout({ frames, footer, children }) {
  const ipad = useMediaQuery(theme => theme.breakpoints.up('ipad'));
  const laptop = useMediaQuery(theme => theme.breakpoints.up('laptop'));
  const desktop = useMediaQuery(theme => theme.breakpoints.up('desktop'));
  const { portrait } = useWindowOrientation();
  const [brand, setBrand] = useState({});

  useEffect(() => {
    unmounting = false;
    reactor.init();
    (async function getBarndData() {
      const brand = await reactor.getDoc(process.env.NEXT_PUBLIC_REACTOR_BRAND);
      if (!unmounting) {
        setBrand(brand);
      }
    })();
    return () => {
      unmounting = true;
    };
  }, []);

  function getResponsiveLayout() {
    switch (true) {
      case desktop:
        return (
          <DesktopLayout
            logo={brand.logoDesktop}
            frames={frames}
            footer={footer}
          >
            {children}
          </DesktopLayout>
        );
      case laptop:
        return (
          <MobileLandscapeLayout
            logo={brand.logoMobile}
            frames={frames}
            footer={footer}
          >
            {children}
          </MobileLandscapeLayout>
        );
      case ipad:
        return (
          <IpadLayout logo={brand.logoDesktop} frames={frames} footer={footer}>
            {children}
          </IpadLayout>
        );
      default:
        // defaults to smartphones
        return portrait ? (
          <MobileLayout logo={brand.logoMobile} frames={frames} footer={footer}>
            {children}
          </MobileLayout>
        ) : (
          <MobileLandscapeLayout
            logo={brand.logoMobile}
            frames={frames}
            footer={footer}
          >
            {children}
          </MobileLandscapeLayout>
        );
    }
  }

  return frames ? <div>{getResponsiveLayout()}</div> : null;
}
