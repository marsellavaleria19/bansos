/* eslint-disable react/prop-types */
import React from 'react';
import CNavbar from './CNavbar';

const Layout = (props)=>{
   return (
      <>
         <CNavbar/>
         {props.children}
      </>
      

   );
};

export default Layout;