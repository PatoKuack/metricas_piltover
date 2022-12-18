import React, { children } from 'react';

const Layout = ({children}) => {
  return (
    <div className='min-h-[100vh] h-full min-w-[100vw] bg-teal-700 text-teal-50'>
      {children}
    </div>
  );
}

export default Layout;