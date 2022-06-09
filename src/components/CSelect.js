import React from 'react';
import { Form } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const CSelect = ({label,children,...rest})=>{
   return (
      <>
         <Form.Label className='input-label'>{label}</Form.Label>
         <Form.Select className='input-form' {...rest}>
            {children}
         </Form.Select>
      </>
   );
};

export default CSelect;