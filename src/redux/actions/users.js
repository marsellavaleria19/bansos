const getData = async(data)=>{
   const time = Math.round(Math.random()*10000);
   var result = null;
   if(time>1500){
      if(time%2==0){
         result = await Promise.reject('Error 500 - Internal server error');
      }else{
         result = await Promise.reject('Error 404- Page not found');
      }
   }else{
      result = await Promise.resolve(data);
   }
   return result;
};

export const addUsers = (data) => {
   return {
      type: 'GET_USER',
      payload: getData(data)
   };
};