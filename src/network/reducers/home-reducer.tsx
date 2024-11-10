import { createSlice } from '@reduxjs/toolkit';

export interface HomeState {
  appointmentData: [];
}

const initialState: HomeState = {
  appointmentData: [],
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setAppointmentData: (state, action) => {
      state.appointmentData = action.payload
    },
  },
});

const homeReducer = homeSlice.reducer;

const { setAppointmentData } = homeSlice.actions;

export { homeReducer, setAppointmentData };

