import { createSlice } from '@reduxjs/toolkit';

type RentState = {
  bikeId: string | null
  beingRented: boolean,
  startTime: Date | null
  user: string | null,
  tripID: string | null
};

const initialState: RentState = {
  bikeId: null,
  beingRented: false,
  startTime: null,
  user: null,
  tripID: null
};

const rentSlice = createSlice({
  name: 'rent',
  initialState,
  reducers: {
    setBikeId(state, action) {
      state.bikeId = action.payload;
    },
    setRentStatus(state, action) {
      state.beingRented = action.payload;
    },
    setStartTime(state, action) {
        state.startTime = action.payload
    },
    setUser(state, action) {
        state.user = action.payload
    },
    setTripID(state, action) {
      state.tripID = action.payload
  }
  },
});

export const { setBikeId, setRentStatus, setStartTime, setUser, setTripID } = rentSlice.actions;
export default rentSlice.reducer;
