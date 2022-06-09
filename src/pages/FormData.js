import React, { useEffect, useState } from 'react';
import { Form,Button, Container, Card, Row,Col} from 'react-bootstrap';
import CInput from '../components/CInput';
import CSelect from '../components/CSelect';
import {FaChevronLeft} from 'react-icons/fa';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers } from '../redux/actions/users';
import { getListProvinces,getListCities,getListDistricts,getListVillages } from '../redux/actions/regions';
import { validation } from '../helpers/validation';
import ModalError from '../components/ModalError';
import ModalLoading from '../components/ModalLoading';
import ModalSuccess from '../components/ModalSuccess';
import { useNavigate } from 'react-router-dom';

const FormData = ()=>{
   const{regions,users} = useSelector(state=>state);
   const dispatch = useDispatch();
   const [inputUser,setInputUser] = useState({
      name:'',
      idCard:'',
      idFamily:'',
      age:0,
      gender:'',
      province:'',
      city:'',
      district:'',
      village:'',
      address:'',
      rt:'',
      rw:'',
      amountBefore:0,
      amountAfter:0,
      reason:'',
      otherReason:''
   });
   const [pictureIdCard,setPictureIdCard] = useState('');
   const [pictureIdFamily,setPictureIdFamily] = useState('');
   const [error,setError] = useState({});
   var [messageError,setMessageError] = useState('');
   var [messageSuccess,setMessageSuccess] = useState('');
   const [showModalError,setShowModalError] = useState(false);
   const [showModalSuccess,setShowModalSuccess] = useState(false);
   const [showModalLoading,setShowModalLoading] = useState(false);
   const handleCloseLoading = () => setShowModalLoading(false);
   const handleCloseError = () => setShowModalError(false);
   const handleCloseSuccess = () => setShowModalSuccess(false);
   const [control,setControl] = useState(false);
   const navigate = useNavigate();

   useEffect(()=>{
      dispatch(getListProvinces());
      setError({});
   },[]);

   useEffect(()=>{
      setShowModalLoading(users.isLoading);
      if(users.isLoading==false && control==true){
         if(users.isError){
            messageError = users.errMessage;
            setMessageError(messageError);
            setShowModalError(true);
         }else{
            messageSuccess = 'Data user berhasil ditambah.';
            setMessageSuccess(messageSuccess);
            setShowModalSuccess(true);
         }
         setControl(false);
      }
   },[users.isLoading]);

   const changeHandle = (event) =>{
      event.preventDefault();
      const value = event.target.value;
      const nameInput = event.target.name;
      inputUser[nameInput] = value;

      setInputUser({...inputUser});
      if(inputUser.province!==''){
         dispatch(getListCities(inputUser.province));
      }

      if(inputUser.city!==''){
         dispatch(getListDistricts(inputUser.city));
      }

      if(inputUser.district!==''){
         dispatch(getListVillages(inputUser.district));
      }
   };

   const submitHandle = (event)=>{
      event.preventDefault();
      const data = {
         nama: inputUser.name,
         nik:inputUser.idCard,
         'nomor kartu keluarga':inputUser.idFamily,
         'foto KTP' : pictureIdCard!=='' ? pictureIdCard.name : '',
         'foto kartu keluarga' : pictureIdFamily!=='' ? pictureIdFamily.name : '',
         umur:inputUser.age.toString(),
         'jenis kelamin': inputUser.gender,
         provinsi:inputUser!==null ? inputUser.province.toString() : '',
         'kab/kota': inputUser!== null ? inputUser.city.toString() : '',
         kecamatan: inputUser!== null ? inputUser.district.toString() : '',
         'kelurahan/desa': inputUser!==null ? inputUser.village.toString() : '',
         alamat:inputUser.address,
         rt:inputUser.rt.toString(),
         rw:inputUser.rw.toString(),
         'penghasilan sebelum pandemi':inputUser.amountBefore.toString(),
         'penghasilan setelah pandemi':inputUser.amountAfter.toString(),
         'alasan membutuhkan bantuan':inputUser.reason,
         agreement : event.target.elements['agreement'].checked
      };

      const requirement = {
         nama: 'required',
         nik: 'required',
         'nomor kartu keluarga': 'required',
         'foto KTP' : 'required',
         'foto kartu keluarga' : 'required',
         umur: 'required|number',
         'jenis kelamin': 'choose',
         provinsi: 'choose',
         'kab/kota': 'choose',
         kecamatan: 'choose',
         'kelurahan/desa': 'choose',
         alamat: 'required',
         rt: 'required|number',
         rw: 'required|number',
         'penghasilan sebelum pandemi': 'required|grather0',
         'penghasilan setelah pandemi': 'required|grather0',
         'alasan membutuhkan bantuan': 'choose',
      };

      if(inputUser.reason=='Lainnya'){
         data['alasan lain'] = inputUser.otherReason;
         requirement['alasan lain'] = 'required';
      }

      var validate = validation(data,requirement);
      if(data.umur !== ''){
         if(data.umur <25){
            validate = {...validate,umur:'umur harus lebih besar atau sama dengan 25'};
         }
      }

      if(data['foto KTP']!==''){
         const typeImage = [
            'image/jpg',
            'image/jpeg',
            'image/png',
            'image/bmp'
         ];

         if(pictureIdCard.size>2000000){
            validate = {...validate,'foto KTP':'ukuran file maksimal 2MB.'};
         }

         if(!typeImage.includes(pictureIdCard.type)){
            validate = {...validate,'foto KTP':'file harus dengan format JPG/JPEG/PNG/BMP.'};
         }
      }

      if(data['foto kartu keluarga']!==''){
         const typeImage = [
            'image/jpg',
            'image/jpeg',
            'image/png',
            'image/bmp'
         ];

         if(pictureIdFamily.size>2000000){
            validate = {...validate,'foto kartu keluarga':'ukuran file maksimal 2MB.'};
         }

         if(!typeImage.includes(pictureIdFamily.type)){
            validate = {...validate,'foto kartu keluarga':'file harus dengan format JPG/JPEG/PNG/BMP.'};
         }
      }

      if(data.agreement==false){
         validate.persetujuan = 'persetujuan wajib diisi.';
      }

      if(Object.keys(validate).length == 0){
         var dataUser = {
            name:inputUser.name,
            idCard:inputUser.idCard,
            idFamily:inputUser.idFamily,
            age:inputUser.age,
            gender:inputUser.gender,
            province:regions.listProvince.filter((item)=>item.id==inputUser.province)[0].name,
            city:regions.listCity.filter((item)=>item.id==inputUser.city)[0].name,
            district:regions.listDistrict.filter((item)=>item.id==inputUser.district)[0].name,
            village:regions.listVillage.filter((item)=>item.id==inputUser.village)[0].name,
            address:inputUser.address,
            rt:inputUser.rt,
            rw:inputUser.rw,
            amountBefore:inputUser.amountAfter,
            amountAfter:inputUser.amountBefore,
            reason:inputUser.reason,
            otherReason:inputUser.otherReason,
            imageIdCard:pictureIdCard,
            imageIdFamily:pictureIdFamily
         };
         dispatch(addUsers(dataUser));
         setControl(true);
         setError({});
      }else{
         setError(validate);
      }
   };

   const selectFileIdCard = (event)=>{
      event.preventDefault();
      setPictureIdCard(event.target.files[0]);
   };

   const selectFileIdFamily = (event)=>{
      event.preventDefault();
      setPictureIdFamily(event.target.files[0]);
   };

   const changeAddressHandle = (event)=>{
      event.preventDefault();
      const value = event.target.value;
      if(value.length<=255){
         inputUser.address = value;
         setInputUser({...inputUser});
      }
   };

   const goToPreviewData = ()=>{
      navigate('/preview-data');
   };

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
                  Form Data Penerima Bansos
               </Card.Header>
               <Card.Body>
                  <Container>
                     <Form onSubmit={submitHandle}>
                        <ModalLoading show={showModalLoading} close={handleCloseLoading}/>
                        {
                           messageError!=='' && <ModalError message={messageError} show={showModalError} close={handleCloseError}/> 
                        }
                        {
                           messageSuccess!=='' && <ModalSuccess message={messageSuccess} show={showModalSuccess} close={handleCloseSuccess} button="Go to preview data" functionHandle={goToPreviewData}/>
                        }
                        <div className='mb-3'>
                           <CInput label="Nama" typeInput="text" placeholder="Nama" name='name' value={inputUser.name} onChange={changeHandle}/>
                           {error!==null && error.nama ? <div className="error">{error.nama}</div> : '' }
                        </div>
                        <div className='mb-3'>
                           <CInput label="NIK" typeInput="number" placeholder="NIK" name='idCard' value={inputUser.idCard} onChange={changeHandle}/>
                           {error!==null && error.nik ? <div className="error">{error.nik}</div> : '' }
                        </div>
                        <div className='mb-3'>
                           <CInput label="Nomor Kartu Keluarga" typeInput="number" placeholder="Nomor Kartu Keluarga" name='idFamily' value={inputUser.idFamily} onChange={changeHandle}/>
                           {error!==null && error['nomor kartu keluarga'] ? <div className="error">{error['nomor kartu keluarga']}</div> : '' }
                        </div>
                        <div className='mb-3'>
                           <label className='input-label'>Foto KTP</label>
                           <div className='input-layout mt-2'>
                              <input type='file' name="imageIdCard" className='input-file' onChange={selectFileIdCard}/>
                           </div>
                           {error!==null && error['foto KTP'] ? <div className="error">{error['foto KTP']}</div> : '' }
                        </div>
                        <div className='mb-3'>
                           <label className='input-label'>Foto Kartu Keluarga</label>
                           <div className='input-layout mt-2'>
                              <input type='file' name="imageIdFamily" className='input-file' onChange={selectFileIdFamily}/>
                           </div>
                           {error!==null && error['foto kartu keluarga'] ? <div className="error">{error['foto kartu keluarga']}</div> : '' }
                        </div>
                        <div className='mb-3'>
                           <CInput label="Umur" typeInput="number" placeholder="Umur" name='age' value={inputUser.age} onChange={changeHandle}/>
                           {error!==null && error.umur ? <div className="error">{error.umur}</div> : '' }
                        </div>
                        <div className='mb-3'>
                           <CSelect label="Jenis Kelamin" name='gender' value={inputUser.gender} onChange={changeHandle}>
                              <option style={{display:'none'}}>Jenis Kelamin</option>
                              <option value="Wanita">Wanita</option>
                              <option value="Pria">Pria</option>
                           </CSelect>
                           {error!==null && error['jenis kelamin'] ? <div className="error">{error['jenis kelamin']}</div> : '' }
                        </div>
                        <div className='mb-3'>
                           <CSelect label="Provinsi" name='province' value={inputUser.province} onChange={changeHandle}>
                              <option value={''} style={{display:'none'}}>Provinsi</option>
                              {
                                 regions.listProvince.map((item)=>{
                                    return(
                                       <option key={item.id} value={item.id}>{item.name}</option>
                                    );
                                 })
                              }
                           </CSelect>
                           {error!==null && error.provinsi ? <div className="error">{error.provinsi}</div> : '' }
                        </div>
                        <div className='mb-3'>
                           <CSelect label="Kab/Kota" name='city' value={inputUser.city} onChange={changeHandle}>
                              <option value={''} style={{display:'none'}}>Kab/Kota</option>
                              {
                                 regions.listCity.map((item)=>{
                                    return(
                                       <option key={item.id} value={item.id}>{item.name}</option>
                                    );
                                 })
                              }
                           </CSelect>
                           {error!==null && error['kab/kota'] ? <div className="error">{error['kab/kota']}</div> : '' }
                        </div>
                        <div className='mb-3'>
                           <CSelect label="Kecamatan" name='district' value={inputUser.district} onChange={changeHandle}>
                              <option value='' style={{display:'none'}}>Kecamatan</option>
                              {
                                 regions.listDistrict.map((item)=>{
                                    return(
                                       <option key={item.id} value={item.id}>{item.name}</option>
                                    );
                                 })
                              }
                           </CSelect>
                           {error!==null && error.kecamatan ? <div className="error">{error.kecamatan}</div> : '' }
                        </div>
                        <div className='mb-3'>
                           <CSelect label="Kelurahan/Desa" name='village' value={inputUser.village} onChange={changeHandle}>
                              <option style={{display:'none'}}>Kelurahan/Desa</option>
                              {
                                 regions.listVillage.map((item)=>{
                                    return(
                                       <option key={item.id} value={item.id}>{item.name}</option>
                                    );
                                 })
                              }
                           </CSelect>
                           {error!==null && error['kelurahan/desa'] ? <div className="error">{error['kelurahan/desa']}</div> : '' }
                        </div>
                        <div className='mb-3'>
                           <CInput label="Alamat" as="textarea" rows={5} placeholder="Alamat" name='address' value={inputUser.address} onChange={changeAddressHandle}/>
                           <div className='amount-character'>karakter berjumlah : {inputUser.address.length}/255</div>
                           {error!==null && error.alamat ? <div className="error">{error.alamat}</div> : '' }
                        </div>
                        <div className='mb-3'>
                           <Row>
                              <Col sm>
                                 <CInput label="RT" typeInput="text" placeholder="RT" name='rt' value={inputUser.rt} onChange={changeHandle}/>
                                 {error!==null && error.rt ? <div className="error">{error.rt}</div> : '' }
                              </Col>
                              <Col sm>
                                 <CInput label="RW" typeInput="text" placeholder="RW" name='rw' value={inputUser.rw} onChange={changeHandle}/>
                                 {error!==null && error.rw ? <div className="error">{error.rw}</div> : '' }
                              </Col>
                           </Row>
                        </div>
                        <div className='mb-3'>
                           <CInput label="Penghasilan Sebelum Pandemi" typeInput="Number" placeholder="Penghasilan Sebelum Pandemi" name='amountBefore' value={inputUser.amountBefore} onChange={changeHandle}/>
                           {error!==null && error['penghasilan sebelum pandemi'] ? <div className="error">{error['penghasilan sebelum pandemi']}</div> : '' }
                        </div>
                        <div className='mb-3'>
                           <CInput label="Penghasilan Setelah Pandemi" typeInput="Number" placeholder="Penghasilan Setelah Pandemi" name='amountAfter' value={inputUser.amountAfter} onChange={changeHandle}/>
                           {error!==null && error['penghasilan setelah pandemi'] ? <div className="error">{error['penghasilan setelah pandemi']}</div> : '' }
                        </div>
                        <div className={inputUser.reason=='Lainnya' ? 'mb-3' : 'mb-5'}>
                           <CSelect label="Alasan Membutuhkan Bantuan" name="reason" value={inputUser.reason} onChange={changeHandle}>
                              <option style={{display:'none'}}>Alasan Membutuhkan Bantuan</option>
                              <option value="Kehilangan pekerjaan">Kehilangan pekerjaan</option>
                              <option value="Kepala keluarga terdampak atau korban Covid-19">Kepala keluarga terdampak atau korban Covid-19</option>
                              <option value="Tergolong fakir/miskin semenjak sebelum Covid-19">Tergolong fakir/miskin semenjak sebelum Covid-19</option>
                              <option value="Lainnya">Lainnya</option>
                           </CSelect>
                           {error!==null && error['alasan membutuhkan bantuan'] ? <div className="error">{error['alasan membutuhkan bantuan']}</div> : '' }
                        </div>
                        {
                           inputUser.reason=='Lainnya' &&   
                           <div className='mb-5'>
                              <CInput label="Alasan Lain" typeInput="text" placeholder="Alasan lain" name="otherReason" value={inputUser.otherReason} onChange={changeHandle}/>
                              {error!==null && error['alasan lain'] ? <div className="error">{error['alasan lain']}</div> : '' }
                           </div>
                        }
                      
                        <div className='mb-5'>
                           <Form.Check 
                              type='checkbox'
                              label='Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut.'
                              className='label-check'
                              name="agreement"
                           />
                           {error!==null && error.persetujuan ? <div className="error">{error.persetujuan}</div> : '' }
                        </div>
                        <Button variant="primary" type="submit" className='button-submit'>
                    Submit
                        </Button>
                     </Form>
                  </Container>
                 
               </Card.Body>
            </Card>
         </Container>
      </Layout>
     
       
   );
};

export default FormData;