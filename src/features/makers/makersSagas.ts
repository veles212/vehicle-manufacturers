import { call, put, select, takeLeading } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
  BaseResponse,
  MakesResponse,
  ManufacturerResponse,
  requestMakes,
  requestManufacturers,
} from 'features/makers/makersApi';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  getMakes,
  getMakesFail,
  getMakesSuccess,
  getManufacturers,
  getManufacturersSuccess,
  Manufacturer,
  selectPagesLoaded,
} from 'features/makers/makersSlice';

function* handleGetManufacturers() {
  const pagesLoaded: ReturnType<typeof selectPagesLoaded> = yield select(
    selectPagesLoaded
  );
  const page = pagesLoaded + 1;

  try {
    const response: AxiosResponse<BaseResponse<ManufacturerResponse[]>> =
      yield requestManufacturers(page);
    const makers: Manufacturer[] = response.data.Results.map((result) => ({
      country: result.Country,
      commonName: result.Mfr_CommonName,
      id: result.Mfr_ID,
      name: result.Mfr_Name,
    }));
    yield put(getManufacturersSuccess({ makers, pagesLoaded: page }));
  } catch (e) {
    //ignore
  }
}

function* handleGetMakes(action: PayloadAction<{ makerId: number }>) {
  const { makerId } = action.payload;
  try {
    const response: AxiosResponse<BaseResponse<MakesResponse[]>> =
      yield requestMakes(makerId);
    const makes = response.data.Results.map(({ Make_Name }) => Make_Name);
    yield put(getMakesSuccess({ makes, makerId }));
  } catch (e) {
    yield put(getMakesFail({ makerId }));
  }
}

export function* makersSaga() {
  yield call(handleGetManufacturers);
  yield takeLeading(getManufacturers.type, handleGetManufacturers);
  yield takeLeading(getMakes.type, handleGetMakes);
}
