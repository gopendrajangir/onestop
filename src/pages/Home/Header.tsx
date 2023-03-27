import React from 'react';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div
      className={`flex flex-col justify-center items-center min-h-screen h-screen text-2xl`}
    >
      Waitttttt
    </div>
  );
};

export default Header;
