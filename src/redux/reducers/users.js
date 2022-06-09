const dataUsers = {
   listUser: [],
   dataUser : null,
   isLoading:false,
   errMessage : null,
   error: false,
};

const users = (state = dataUsers, action) => {
   switch (action.type) {
   case 'GET_USER_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'GET_USER_FULFILLED':
   {
      state.listUser.push(action.payload);
      state.dataUser = action.payload;
      state.isLoading = false;
      state.isError = false;
      return {...state };
   }
   case 'GET_USER_REJECTED':
   {
      state.isLoading = false;
      state.isError = true;
      state.errMessage = action.payload;
      return {...state };
   }
   case 'GET_USERS':
   {
      state.listUser;
      return {...state};
   } 
   default:
   {
      return {...state };
   }
   }
};

export default users;