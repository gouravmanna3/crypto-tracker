import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import numeral from "numeral";
import PropTypes from 'prop-types';
import CoinChart from './coinChart';

const currencyFormat = {
  maximumFractionDigits: 2,
  style: 'currency',
  currency: 'INR'
}

const CHART_BOX_SIZE = {
  height: 40,
  width: 150
};

const CoinsTable = ({coins}) => {
  console.log(coins)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="left">Coin</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">24h%</TableCell>
            <TableCell align="right">7%</TableCell>
            <TableCell align="right">24h volume</TableCell>
            <TableCell align="right">Market Cap</TableCell>
            <TableCell align="right">Last 7 days</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins?.map((coin) => (
            <TableRow
              key={coin.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {coin.market_cap_rank}
              </TableCell>
              <TableCell align="left">
                <img
                  height="20rem"
                  width="20rem"
                  src={coin.image}
                  alt={coin.name}
                />
                {coin.name}
                {coin.symbol.toUpperCase()}
              </TableCell>
              <TableCell align="right">{coin.current_price.toLocaleString("en-IN", currencyFormat)}</TableCell>
              <TableCell align="right">{numeral(coin.price_change_percentage_24h / 100).format("0.0%")}</TableCell>
              <TableCell align="right">{numeral(coin.price_change_percentage_7d_in_currency / 100).format("0.0%")}</TableCell>
              <TableCell align="right">{coin.total_volume.toLocaleString("en-IN")}</TableCell>
              <TableCell align="right">{coin.market_cap.toLocaleString("en-IN")}</TableCell>
              <TableCell align="right">
                <CoinChart 
                  coin={coin} 
                  height={CHART_BOX_SIZE.height}
                  width={CHART_BOX_SIZE.width}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

CoinsTable.propTypes = {
  coins: PropTypes.array
};

export default CoinsTable;