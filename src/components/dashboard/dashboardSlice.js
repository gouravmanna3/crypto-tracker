import { createSlice , configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

const initialState = {
  coins: []
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    setCoins: (state, { payload }) => {
      state.coins = payload
    }
  }
});

export const { setCoins } = dashboardSlice.actions;


export const getCoins = () => async (dispatch) => {
  try {
    //const response = await axios.get(`${BASE_URL}/coins/markets?vs_currency=inr&sparkline=false&price_change_percentage=1h,24h,7d`);
    const response = await axios.get(`${BASE_URL}/coins/markets`,{params: { vs_currency: 'inr', price_change_percentage:'1h,24h,7d',per_page:'20', page:'1'}});
    dispatch(setCoins(response.data));
  } catch(err) {
    console.log(err);
  }
}

export default dashboardSlice.reducer;