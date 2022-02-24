import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import '../styles/globals.css';
import theme from '../theme';
import { PageLayout, SplashScreen, WeUseCookies } from '../components';
import TagManager from 'react-gtm-module';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({
      gtmId: 'GTM-NG9D255'
    });
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
