import React, { useEffect } from 'react';
import {Card, Container,Table,Row,Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CButton from '../components/CButton';
import Layout from '../components/Layout';

const ListData = ()=>{
   const {users} = useSelector(state=>state);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(()=>{
      dispatch({
         type:'GET_USERS'
      });
   },[]);

   return(
      <Layout>
         <Container>
            <div className="mt-5">
               <Card>
                  <Card.Header>
                     <Row>
                        <Col md={8} lg={10}><div className='mb-2'>List Data Penerima Bantuan Sosial</div></Col>
                        <Col md lg={2}><CButton className='button-list w-100' onClick={()=>navigate('/add')}>Tambah Data</CButton></Col>
                     </Row>
                  </Card.Header>
                  <Card.Body>
                     <Table size="sm">
                        <thead>
                           <tr>
                              <th>#</th>
                              <th>NIK</th>
                              <th>Nama</th>
                              <th>Jenis Kelamin</th>
                              <th>Umur</th>
                              <th>Provinsi</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              users.listUser.map((item,index)=>{
                                 return(
                                    <tr key={item.idCard}>
                                       <td>{index+1}</td>
                                       <td>{item.idCard}</td>
                                       <td>{item.name}</td>
                                       <td>{item.gender}</td>
                                       <td>{item.age}</td>
                                       <td>{item.province}</td>
                                    </tr>
                                 );
                              }) 
                           }
                        </tbody>
                     </Table>
                  </Card.Body>
               </Card>
            </div>
         </Container>
      </Layout>
   );
};

export default ListData;