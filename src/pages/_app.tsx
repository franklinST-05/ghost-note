import { AppProps } from 'next/app';
import './styles/global.css';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';

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