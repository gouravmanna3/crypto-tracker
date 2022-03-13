import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currency: 'INR',
  loading: false
}

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setCurrency: (state, { payload }) => {
      state.currency = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    }
  }
});

export const { setCurrency, setLoading } = appSlice.actions;

export default appSlice.reducer;