import { AppProps } from 'next/app';
import './styles/global.css';
import Head from 'next/head';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>GhostNote</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;