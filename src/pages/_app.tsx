import { AppProps } from 'next/app';
import './styles/global.css';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>GhostNote</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;