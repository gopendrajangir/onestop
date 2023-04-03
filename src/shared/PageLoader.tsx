import React from 'react';
import Loader from './Loader';

interface PageLoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const PageLoader: React.FC<PageLoaderProps> = (props) => {
  return (
    // <div className="fixed z-20 top-[7rem] left-0 h-[calc(100vh-7rem)] w-screen lg:max-w-[1440px] flex items-center justify-center">
    <div className="fixed z-30 -translate-x-1/2 -translate-y-1/2 top-[calc(50vh)] left-[50vw] h-16 w-16 flex justify-center items-center rounded-full shadow-[2px_2px_12px_0px_rgba(0,0,0,0.2)] bg-white">
      <Loader className="!border-t-violet-500 !border-[3px] !w-10" />
    </div>
    // </div>
  );
};

export default PageLoader;
