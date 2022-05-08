import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { store } from '../../redux/store';

const initialState = {
  coins: [],
  per_page: 20,
  page: 1
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    setCoins: (state, { payload }) => {
      state.coins = payload
    },
    setPaginationPage: (state, { payload }) => {
      state.page = payload
    }
  }
});

export const { setCoins, setPaginationPage } = dashboardSlice.actions;



export const getCoins = (currency, page) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`,{params: { vs_currency: currency, price_change_percentage:'1h,24h,7d',per_page:'20', page: page}});
    const state = store.getState();
    const prevCoins = state.dashboard.coins;
    dispatch(setCoins([...prevCoins, ...response.data]));
  } catch(err) {
    console.log(err);
  }
}

export default dashboardSlice.reducer;