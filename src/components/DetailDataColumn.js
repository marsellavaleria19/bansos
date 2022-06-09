import React from 'react';

// eslint-disable-next-line react/prop-types
const DetailDataColumn = ({label,children})=>{
   return (
      <>
         <label className='data-label'>{label}</label>
         <div className='data-value'>{children}</div>
      </>
     
   );
};

export default DetailDataColumn;