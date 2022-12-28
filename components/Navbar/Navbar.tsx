import { useState } from 'react';
import Link from 'next/link';
import { MdMenu, MdClose } from 'react-icons/md';

import StyledLink from './StyledLink';
import { links } from './links';

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const MenuIcon = navbarOpen ? MdClose : MdMenu;

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-cyan-700 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <StyledLink href="/" label="Maps Showcase" />
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <MenuIcon />
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center' +
              (navbarOpen ? ' flex' : ' hidden')
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {links.map((link) => (
                <li className="nav-item" key={link.id}>
                  <StyledLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
