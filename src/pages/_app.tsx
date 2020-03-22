import { AppProps } from 'next/app';
import Head from 'next/head';
import '../assets/app.css';

export default ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <link rel="icon" type="image/x-icon" href={`favicon.ico`} />
      <link rel="icon" type="image/png" href={`favicon.png`} />
    </Head>
    <Component {...pageProps} />
  </>
);
