import React, { useEffect, useState } from 'react';
import cx from 'classnames';

import MenuIcon from 'assets/img/icons/menu.svg';
import NavSidebar from './NavSidebar';
import NavLinks from './NavLinks';
import Modal from 'shared/Modal';
import navData from '../navData';
import { useLocation } from 'react-router-dom';

interface INavLinksContext {
  closeSidebar: () => void;
  setShowModal: (val: boolean) => void;
  setNavIdx: (idx: number) => void;
}

export const navLinksContext = React.createContext<INavLinksContext>({
  closeSidebar: () => {},
  setShowModal: (val) => {},
  setNavIdx: (idx) => {},
});

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {}

const Menu: React.FC<MenuProps> = ({ className }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [slided, setSlided] = useState(false);
  const [navIdx, setNavIdx] = useState<number>();
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setShowModal(false);
    setShowSidebar(false);
  }, [location]);

  return (
    <div className={cx(className, '')}>
      <button
        className={cx(
          'z-20 hidden w-screen lg:max-w-[1440px] h-screen bg-black bg-opacity-25 fixed top-0 left-0',
          {
            '!block': showSidebar,
          }
        )}
        onClick={() => setShowSidebar(false)}
      ></button>
      <navLinksContext.Provider
        value={{
          setShowModal: (val) => {
            console.log('hello');
            setShowModal(val);
          },
          setNavIdx: (idx) => setNavIdx(idx),
          closeSidebar: () => setShowSidebar(false),
        }}
      >
        <NavSidebar
          className={cx('hidden', {
            'nav-slide-in !flex': showSidebar,
            'nav-slide-out !flex': slided && !showSidebar,
          })}
          close={() => setShowSidebar(false)}
        />
        <button
          onClick={() => {
            setSlided(true);
            setShowSidebar(true);
          }}
        >
          <MenuIcon className="w-8" />
        </button>
        {showModal && (
          <Modal
            onClose={() => {
              setShowModal(false);
            }}
          >
            <NavLinks
              className="bg-white p-20 rounded-md"
              navItem={navData[navIdx]}
            />
          </Modal>
        )}
      </navLinksContext.Provider>
    </div>
  );
};

export default Menu;
