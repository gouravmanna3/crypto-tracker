import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
// import axios from 'axios';
// import { BASE_URL } from '../../utils/constants';
// import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { Line } from 'react-chartjs-2';

const CoinDetails = (props) => {
  const location = useLocation();
  const { id } = useParams();
  const currency = useSelector((state) => state.app.currency);
  console.log(id,currency);
  useEffect(()=>{
    // const response = await axios.get(`${BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=1`);
    // console.log(response.data);
  }, [id, currency]);

  return (
    <>
    <div>CoinDetails</div>
    </>
  )
}

export default CoinDetails;