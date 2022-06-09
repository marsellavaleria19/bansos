import React from 'react';
import {Container, Card,Row,Col} from 'react-bootstrap';
import {FaChevronLeft} from 'react-icons/fa';
import Layout from '../components/Layout';
import DetailDataRow from '../components/DetailDataRow';
import DetailDataColumn from '../components/DetailDataColumn';
import {useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PreviewData = ()=>{
   const{users} = useSelector(state=>state);
   const navigate = useNavigate();

   return(
      <Layout>
         <Container>
            <div className='mt-3 navigate-back'>
               <div className='d-flex align-items-center' onClick={()=>navigate('/')}>
                  <FaChevronLeft/>
                  <div className='ms-3'>Home</div>
               </div>
            </div>
            <Card className='mt-3 mb-5'>
               <Card.Header>
                  Preview Data Penerima Bansos
               </Card.Header>
               <Card.Body>
                  <Container>
                     <div className='mt-3 mb-5'>
                        <Row>
                           <Col md>
                              <div className='mb-3'>
                                 <DetailDataRow label='Nama' value={users.dataUser.name}/>
                              </div>
                              <div className='mb-3'>
                                 <DetailDataRow label='NIK' value={users.dataUser.idCard}/>
                              </div>
                              <div className='mb-3'>
                                 <DetailDataRow label='Nomor Kartu Keluarga' value={users.dataUser.idFamily}/>
                              </div>
                              <div className='mb-3'>
                                 <DetailDataRow label='Umur' value={users.dataUser.age}/>
                              </div>
                              <div className='mb-3'>
                                 <DetailDataRow label='Jenis Kelamin' value={users.dataUser.gender}/>
                              </div>
                              <div className='mb-3'>
                                 <DetailDataRow label='Provinsi' value={users.dataUser.province}/>
                              </div>
                              <div className='mb-3'>
                                 <DetailDataRow label='Kab/Kota' value={users.dataUser.city}/>
                              </div>
                              <div className='mb-3'>
                                 <DetailDataRow label='Kecamatan' value={users.dataUser.district}/>
                              </div>
                              <div className='mb-3'>
                                 <DetailDataRow label='Kelurahan/Desa' value={users.dataUser.village}/>
                              </div>
                              <div className='mb-3'>
                                 <DetailDataRow label='Alamat' value={users.dataUser.address}/>
                              </div>
                              <div className='mb-3'>
                                 <Row>
                                    <Col xl={2}>
                                       <div className='d-flex justify-content-start'>
                                          <div className='data-label'>RT</div>
                                          <div className="data-value ms-2">{users.dataUser.rt}</div>
                                       </div>
                                    </Col>
                                    <Col xl>
                                       <div className='d-flex justify-content-start ms-3'>
                                          <div className='data-label'>RW</div>
                                          <div className="data-value ms-2">{users.dataUser.rw}</div>
                                       </div>
                                    </Col>
                                 </Row>
                              </div>
                              <div className='mb-3'>
                                 <DetailDataColumn label={'Penghasilan sebelum pandemi'}>
                                    Rp. {Number(users.dataUser.amountBefore).toLocaleString('id-ID')}
                                 </DetailDataColumn>
                              </div>
                              <div className='mb-3'>
                                 <DetailDataColumn label='Penghasilan setelah pandemi'>
                              Rp. {Number(users.dataUser.amountAfter).toLocaleString('id-ID')}
                                 </DetailDataColumn>
                              </div>
                              <div className='mb-3'>
                                 <DetailDataColumn label='Alasan membutuhkan bantuan'>
                                    {users.dataUser.reason!=='Lainnya' ? users.dataUser.reason : `${users.dataUser.reason} : ${users.dataUser.otherReason}`}
                                 </DetailDataColumn>
                              </div>
                           </Col>
                           <Col md>
                              <div className='mb-3'>
                                 <label className='data-label'>Foto KTP</label>
                                 <div className='mt-3'>
                                    <img src={URL.createObjectURL(users.dataUser.imageIdCard)} alt='Foto KTP' className='img-fluid'/>
                                 </div>
                              </div>
                              <div className='mb-3'>
                                 <label className='data-label'>Foto Kartu Keluarga</label>
                                 <div className='mt-3'>
                                    <img src={URL.createObjectURL(users.dataUser.imageIdFamily)} alt='Foto Kartu Keluarga' className='image'/>
                                 </div>
                              </div>
                           </Col>
                        </Row>
                     </div>
                  </Container>
               </Card.Body>
            </Card>
         </Container>
      </Layout>
     
       
   );
};

export default PreviewData;