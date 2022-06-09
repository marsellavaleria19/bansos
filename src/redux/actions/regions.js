import axios from 'axios';

export const getListProvinces = () => {
   return {
      type: 'GET_PROVINCE',
      payload: axios.get('http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
   };
};

export const getListCities = (idProvice) => {
   return {
      type: 'GET_CITY',
      payload: axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${idProvice}.json`)
   };
};

export const getListDistricts = (idCity) => {
   return {
      type: 'GET_DISTRICT',
      payload: axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/districts/${idCity}.json`)
   };
};

export const getListVillages = (idDistrict) => {
   return {
      type: 'GET_VILLAGE',
      payload: axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/villages/${idDistrict}.json`)
   };
};