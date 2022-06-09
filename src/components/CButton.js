import React from 'react';
import { Button } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const CButton = ({children,...rest})=>{
   return (
      <Button className={'button fw-bold w-100'} {...rest}>{children}</Button>
   );
};

export default CButton;