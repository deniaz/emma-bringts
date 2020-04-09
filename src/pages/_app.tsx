import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import '../assets/app.css';
import { init, track } from '../services/google-analytics';

export default ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    if (!window.GA_INITIALIZED) {
      init();
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      window.GA_INITIALIZED = true;
    }

    track();
  });
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href={`favicon.ico`} />
        <link rel="icon" type="image/png" href={`favicon.png`} />
        <meta property="og:title" content="Emma Bringts!" />
        <meta property="og:description" content="Unterstütze den lokalen Handel!" />
        <meta property="og:url" content="https://www.emmabringts.ch/" />
        <meta property="og:image" content="https://www.emmabringts.ch/img/OpenGraph.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};
