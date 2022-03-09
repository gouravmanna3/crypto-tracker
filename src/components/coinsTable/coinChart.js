import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

const CoinChart = ({coin, height, width}) => {
  const { id, name } = coin;
  let data;

  useEffect(async () => {
    const response = await axios.get(`${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=7`);
    data = response.data;
  },[id]);

  const mappedData = () => {
    return data.prices.length ? 
      data.prices.map((ele) => ({
        date: new Date(ele[0]),
        price: ele[1]
      }))
      :
      []
  }

  return (
    <div>
      <svg height={height} width={width}>
        <LineChart 
          hideBottomAxis
          hideLeftAxis
          data={mappedData}
          width={width}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          yMax={height}
          xScale={dataScale}
          yScale={priceScale}
          stroke={color}
        />
      </svg>
    </div>
  )
}

CoinChart.propTypes = {
    coin: PropTypes.object
}

export default CoinChart; 
