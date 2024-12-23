// src/redux/slices/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

type RentState = {
  bikeId: string | null
  beingRent: boolean,
  startTime: Date | null
  user: string | null
};

const initialState: RentState = {
  bikeId: '',
  beingRent: false,
  startTime: null,
  user: null
};

const rentSlice = createSlice({
  name: 'rent',
  initialState,
  reducers: {
    setBikeId(state, action) {
      state.bikeId = action.payload;
    },
    setRentStatus(state, action) {
      state.beingRent = action.payload;
    },
    setStartTime(state, action) {
        state.startTime = action.payload
    },
    setUser(state, action) {
        state.user = action.payload
    }
  },
});

export const { setBikeId, setRentStatus, setStartTime, setUser } = rentSlice.actions;
export default rentSlice.reducer;
