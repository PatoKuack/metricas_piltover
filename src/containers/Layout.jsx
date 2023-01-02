import React, { children } from 'react';

const Layout = ({children}) => {
  return (
    <div className='min-h-[100vh] h-full min-w-[100vw] pt-12 pb-8 font-sans bg-gradient-to-tr from-teal-900 to-teal-700 text-teal-50 box-border'>
      {children}
    </div>
  );
}

export default Layout;