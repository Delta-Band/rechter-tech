import React from 'react';
import reactor from '../reactor';
import { Helmet } from '../components';
import { Typography } from '@mui/material';

export async function getStaticProps(context) {
  reactor.init();
  const homeFrames = await reactor.getCollection(
    process.env.NEXT_PUBLIC_REACTOR_HOME_FRAMES
  );
  const brand = await reactor.getDoc(process.env.NEXT_PUBLIC_REACTOR_BRAND);
  const seo = await reactor.getDoc(process.env.NEXT_PUBLIC_REACTOR_SEO);
  const footer = await reactor.getDoc(process.env.NEXT_PUBLIC_REACTOR_FOOTER);
  const splash = await reactor.getDoc(process.env.NEXT_PUBLIC_REACTOR_SPLASH);
  const props = {
    frames: homeFrames || [],
    brand,
    seo,
    footer,
    splash
  };
  return {
    props,
    revalidate: 10
  };
}

export default function Home({ seo, brand, splash }) {
  return (
    <>
      <Helmet
        title={seo.metaTitleHome}
        description={seo.metaDescriptionHome}
        imageForSocial={brand.imageForSocial}
        favicon={brand.favicon}
      />
    </>
  );
}
