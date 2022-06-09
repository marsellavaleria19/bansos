const dataRegions = {
   listProvince: [],
   listCity : [],
   listDistrict : [],
   listVillage : [],
   isLoading:false,
   errMessage : null,
   error: false,
};

const regions = (state = dataRegions, action) => {
   switch (action.type) {
   case 'GET_PROVINCE_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'GET_PROVINCE_FULFILLED':
   {
      const {data} = action.payload;
      state.listProvince = data;
      state.isLoading = false;
      return {...state };
   }
   case 'GET_PROVINCE_REJECTED':
   {
      state.isLoading = false;
      state.isError = true;
      return {...state };
   }
   case 'GET_CITY_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'GET_CITY_FULFILLED':
   {
      const {data} = action.payload;
      state.listCity = data;
      state.isLoading = false;
      return {...state };
   }
   case 'GET_CITY_REJECTED':
   {
      state.isLoading = false;
      state.isError = true;
      return {...state };
   }
   case 'GET_DISTRICT_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'GET_DISTRICT_FULFILLED':
   {
      const {data} = action.payload;
      state.listDistrict = data;
      state.isLoading = false;
      return {...state };
   }
   case 'GET_DISTRICT_REJECTED':
   {
      state.isLoading = false;
      state.isError = true;
      return {...state };
   }
   case 'GET_VILLAGE_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'GET_VILLAGE_FULFILLED':
   {
      const {data} = action.payload;
      state.listVillage = data;
      state.isLoading = false;
      return {...state };
   }
   case 'GET_VILLAGE_REJECTED':
   {
      state.isLoading = false;
      state.isError = true;
      return {...state };
   }
   default:
   {
      return {...state };
   }
   }
};

export default regions;