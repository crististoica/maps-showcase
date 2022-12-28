import { Inter } from '@next/font/google';

import { TChildrenProp } from "types";
import { Navbar } from "@/components";

type TMainProps = TChildrenProp;

const inter = Inter({ subsets: ['latin'] });

const Main = (props: TMainProps) => {
  const { children } = props;
  return (
    <div className={inter.className}>
      <Navbar />
      {children}
    </div>
  );
};

export default Main;
