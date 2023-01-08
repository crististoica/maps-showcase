import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { TNextPageWithLayout, TLayouts, TChildrenProp } from 'types';
import { Main } from 'layouts';
import { UIContextProvider } from 'contexts/useUIContext';

type AppPropsWithLayout = AppProps & {
  Component: TNextPageWithLayout;
};

const layouts: {
  [key in TLayouts]: (props: TChildrenProp) => JSX.Element;
} = {
  main: Main,
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { layout } = Component;
  const Layout = layouts[layout];

  return (
    <UIContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UIContextProvider>
  );
}
