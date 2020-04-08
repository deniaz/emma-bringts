import { AppProps } from 'next/app';
import Head from 'next/head';
import '../assets/app.css';

export default ({ Component, pageProps }: AppProps) => (
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
