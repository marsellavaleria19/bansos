import React from 'react';
import { Form } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const CInput = ({label,typeInput,placeholder,...rest})=>{
   return (
      <>
         <Form.Label className='input-label'>{label}</Form.Label>
         <Form.Control type={typeInput} placeholder={placeholder} className="input-form" {...rest}/> 
      </>
   );
};

export default CInput;