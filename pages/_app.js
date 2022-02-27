import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import '../styles/globals.css';
import theme from '../theme';
import { PageLayout, SplashScreen, WeUseCookies } from '../components';
import TagManager from 'react-gtm-module';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GTM_KEY) {
      TagManager.initialize({
        gtmId: process.env.NEXT_PUBLIC_GTM_KEY
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <PageLayout {...pageProps}>
        <Component {...pageProps} />
      </PageLayout>
      <WeUseCookies />
      <SplashScreen {...pageProps} />
    </ThemeProvider>
  );
}
