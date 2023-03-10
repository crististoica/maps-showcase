import Head from 'next/head';

import { TNextPageWithLayout } from 'types';

const Home: TNextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Maps Showcase</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Index Page</h1>
    </>
  );
};

Home.layout = 'main';

export default Home;
