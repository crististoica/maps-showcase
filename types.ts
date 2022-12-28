import { NextPage } from 'next';
import { ReactNode } from 'react';

export type TChildrenProp = {
  children: ReactNode;
};

export type TLayouts = 'main';

export type TNextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layout: TLayouts;
};
