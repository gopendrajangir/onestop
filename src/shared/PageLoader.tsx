import React from 'react';
import Loader from './Loader';

interface PageLoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const PageLoader: React.FC<PageLoaderProps> = (props) => {
  return (
    <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
      <div className="h-16 w-16 flex justify-center items-center rounded-full shadow-[2px_2px_12px_0px_rgba(0,0,0,0.2)] bg-white">
        <Loader className="!border-t-violet-500 !border-[3px] !w-10" />
      </div>
    </div>
  );
};

export default PageLoader;
