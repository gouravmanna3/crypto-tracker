import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import numeral from "numeral";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import CoinChart from './coinChart';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const currencyFormat = {
  maximumFractionDigits: 2,
  style: 'currency',
  currency: 'INR'
}

const CHART_BOX_SIZE = {
  height: 40,
  width: 150
};

const useStyles = makeStyles((theme) => createStyles({
  coinColumn: {
    display: 'flex',
    '& *': {
      marginRight: '1rem'
    }
  },
  tableContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  coinName: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 700,
    padding: '10px 16px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    width: '10%'
  },
}));

const CoinsTable = ({coins}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <TableContainer className={classes.tableContainer}>
      <Table sx={{ minWidth: 650, width: '1000px' }} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="left">Coin</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">24h%</StyledTableCell>
            <StyledTableCell align="right">7d%</StyledTableCell>
            {/* <TableCell align="right">24h volume</TableCell>
            <TableCell align="right">Market Cap</TableCell> */}
            {/* <TableCell align="right">Last 7 days</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {coins?.map((coin) => (
            <TableRow
              key={coin.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {coin.market_cap_rank}
              </StyledTableCell>
              <StyledTableCell align="left">
                <img
                  height="20rem"
                  width="20rem"
                  src={coin.image}
                  alt={coin.name}
                />
                <b onClick={() => {
                    navigate('/market');
                  }}
                  className={classes.coinName}
                >
                  {coin.name}
                </b>
                <div>{coin.symbol.toUpperCase()}</div>
              </StyledTableCell>
              <StyledTableCell align="right">{coin.current_price.toLocaleString("en-IN", currencyFormat)}</StyledTableCell>
              <StyledTableCell 
                align="right"
                style={{color: Math.sign(coin.price_change_percentage_24h) >= 0 ? '#32cd32': '#FF0000' }}
                
              >
                {numeral(coin.price_change_percentage_24h / 100).format("0.0%")}
              </StyledTableCell>
              <StyledTableCell 
                align="right"
                style={{color: Math.sign(coin.price_change_percentage_7d_in_currency) >= 0 ? '#32cd32': '#FF0000' }}
              >
                {numeral(coin.price_change_percentage_7d_in_currency / 100).format("0.0%")}
              </StyledTableCell>
              {/* <TableCell align="right">{coin.total_volume.toLocaleString("en-IN")}</TableCell>
              <TableCell align="right">{coin.market_cap.toLocaleString("en-IN")}</TableCell> */}
              {/* <TableCell align="right">
                <CoinChart 
                  id={coin.id} 
                  height={CHART_BOX_SIZE.height}
                  width={CHART_BOX_SIZE.width}
                  color={Math.sign(coin.price_change_percentage_7d_in_currency) >= 0 ? '#FF0000' : '#00FF00'}
                />
              </TableCell> */}
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