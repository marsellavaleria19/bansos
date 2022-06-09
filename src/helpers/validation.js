import validator from 'validator';


export const validation = (data,requirement) =>{
   var result = {};
   var validate = null;
   for(var key in data){
      if(requirement[key]){
         if (requirement[key].toString().includes('|')) {
            var split = requirement[key].split('|');
            for (let index = 0; index < split.length; index++) {
               validate = validateRequirement(split[index],data[key],key);
               result = {...result,...validate};  
            }
         }else{
            validate = validateRequirement(requirement[key],data[key],key); 
            result = {...result,...validate};
         }
      }
   }
      
   return result;
};

const validateRequirement = (type,data,key)=>{
   var result = {};
   if (type == 'required') {
      if (validator.isEmpty(data)) {
         result[key] = `${key} wajib diisi.`;
      }
   }
   if (type == 'choose') {
      if (validator.isEmpty(data)) {
         result[key] = `${key} wajib dipilih.`;
      }
   }
   if(!validator.isEmpty(data)){
      if (type == 'number') {
         if (!validator.isNumeric(data)) {
            result[key] = `${key} wajib diisi dengan angka`;
         }
      }
      if (type == 'date') {
         if (!validator.isDate(data)) {
            result[key] = `${key} wajib diisi format tanggal.`;
         }
      }
      if(type=='phone'){
         if(!validator.isMobilePhone(data)){
            result[key] = `${key} wajib diisi dengan format nomor handphone`;
         }
      }
      if(type=='email'){
         if(!validator.isEmail(data)){
            result[key] = `${key} wajib diisi dengan format email.`;
         }
      }
      if(type=='grather0'){
         if(validator.isNumeric(data)){
            if(parseInt(data)<=0){
               result[key] = `${key} harus lebih besar dari 0`;
            }
         }
      }
   }
   return result;
};