/* eslint-disable @next/next/no-sync-scripts */
import React from 'react';
import Head from 'next/head';

export default function Helmet({
  title,
  description,
  imageForSocial,
  noIndex = false,
  favicon
}) {
  return (
    <Head>
      <meta charSet='utf-8' />
      <link rel='shortcut icon' href={`${favicon}?v=${new Date().getTime()}`} />
      <title>{title}</title>
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={imageForSocial} />
      <meta name='description' content={description} />
      {noIndex && <meta name='robots' content='noindex' />}
      <meta
        name='google-site-verification'
        content='lqnq_1HVklw95GPM5jTBEa1kxzNewPQCOLjgiwrPXDI'
      />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
      />
      <meta httpEquiv='ScreenOrientation' content='autoRotate:disabled' />
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <script
        type='text/javascript'
        src='https://unpkg.com/lottie-interactive@latest/dist/lottie-interactive.js'
      ></script>
    </Head>
  );
}
