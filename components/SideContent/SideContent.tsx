import { MouseEventHandler } from 'react';
import { MdArrowBackIos } from 'react-icons/md';

import { useUIContext } from 'contexts/useUIContext';
import { TChildrenProp } from 'types';

const SideContent = (props: TChildrenProp) => {
  const { children } = props;
  const { sidePanel } = useUIContext();

  const togglePanel = () => {
    sidePanel.toggle();
  };

  return (
    <aside
      className={`top-0 -left-full w-full bg-gray-600/0 text-white fixed pointer-events-none h-full z-40 origin-left ease-in-out duration-300 ${
        sidePanel.isOpen ? 'translate-x-full' : 'translate-x-0'
      }`}
    >
      <div
        className="w-96 h-screen overflow-auto opacity-100 bg-gray-900 text-white pointer-events-auto pt-24 px-4 relative z-50"
      >
        {children}
      </div>
    </aside>
  );
};

export default SideContent;
