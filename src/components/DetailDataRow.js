import React from 'react';
import { Row,Col} from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const DetailDataRow = ({label,value})=>{
   return (
      <Row>
         <Col sm={4}>
            <div className='data-label'>{label}</div>
         </Col>
         <Col sm>
            <div className="data-value">{value} </div> 
         </Col>
      </Row>
   );
};

export default DetailDataRow;