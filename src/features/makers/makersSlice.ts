import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface Manufacturer {
  country: string;
  commonName: string;
  id: number;
  name: string;
  makes?: string[];
}

const makersAdapter = createEntityAdapter<Manufacturer>({
  selectId: ({ id }) => id,
});

export interface MakersState {
  status: 'idle' | 'loading' | 'failed' | 'adding';
  makers: EntityState<Manufacturer>;
  pagesLoaded: number;
  selectedManufacturer: number | null;
}

const initialState: MakersState = {
  status: 'loading',
  makers: makersAdapter.getInitialState(),
  pagesLoaded: 0,
  selectedManufacturer: null,
};

export const makersSlice = createSlice({
  name: 'makers',
  initialState,
  reducers: {
    // mutating state because immer used under the hood
    getManufacturers(state) {
      state.status = 'adding';
    },
    getManufacturersSuccess(
      state,
      action: PayloadAction<{ makers: Manufacturer[]; pagesLoaded: number }>
    ) {
      const { makers, pagesLoaded } = action.payload;
      state.status = 'idle';
      state.makers = makersAdapter.addMany(state.makers, makers);
      state.pagesLoaded = pagesLoaded;
    },
    getMakes(_state, _action: PayloadAction<{ makerId: number }>) {
      //for saga
    },
    getMakesSuccess(
      state,
      action: PayloadAction<{ makes: string[]; makerId: number }>
    ) {
      const { makes, makerId } = action.payload;
      state.makers = makersAdapter.updateOne(state.makers, {
        id: makerId,
        changes: { makes },
      });
    },
    getMakesFail(state, action: PayloadAction<{ makerId: number }>) {
      const { makerId } = action.payload;
      state.makers = makersAdapter.updateOne(state.makers, {
        id: makerId,
        changes: { makes: [] },
      });
    },
  },
});

export const {
  getManufacturers,
  getManufacturersSuccess,
  getMakes,
  getMakesSuccess,
  getMakesFail,
} = makersSlice.actions;

export const selectMakersStatus = (state: RootState) => state.makers.status;
export const selectPagesLoaded = (state: RootState) => state.makers.pagesLoaded;

export const { selectById, selectAll } = makersAdapter.getSelectors<RootState>(
  (state) => state.makers.makers
);
export const selectManufacturerById = (makerId: number) => (state: RootState) =>
  selectById(state, makerId);
export { selectAll as selectAllManufacturers };
