import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://vpic.nhtsa.dot.gov/api/',
  headers: { 'Content-Type': 'application/json' },
  params: { format: 'json' },
});

export interface BaseResponse<Type> {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: Type;
}

export interface ManufacturerResponse {
  Country: string;
  Mfr_CommonName: string;
  Mfr_ID: number;
  Mfr_Name: string;
  VehicleTypes: { IsPrimary: boolean; Name: string }[];
}

export const requestManufacturers = (page: number) =>
  axiosInstance.get<BaseResponse<ManufacturerResponse[]>>(
    '/vehicles/GetAllManufacturers',
    {
      params: { page },
    }
  );

export interface MakesResponse {
  Make_ID: number;
  Make_Name: string;
  Mfr_Name: string;
}

export const requestMakes = (makerId: number) =>
  axiosInstance.get<BaseResponse<MakesResponse[]>>(
    `/vehicles/GetMakeForManufacturer/${makerId}`
  );
