import React from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import numeral from "numeral";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { currency_formatter } from '../../utils/utils';


const useStyles = makeStyles((theme) => createStyles({
  coinColumn: {
    display: 'flex',
    '& *': {
      marginRight: '1rem'
    }
  },
  tableContainer: {
    display: 'flex',
    margin: '2em 0',
    color: 'white'
  },
  coinName: {
    display: 'flex',
    '& *': {
      marginRight: '0.5rem'
    }
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 700,
    padding: '10px 16px',
    color:'white'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    width: '10%',
    color:'white'
  },
}));

const CoinsTable = ({ coins, currency }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <TableContainer className={classes.tableContainer}>
      <Table sx={{ minWidth: 650, width: '1000px', margin: '0 auto', zIndex: 1 }} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="left">Coin</StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
            <StyledTableCell align="left">24h%</StyledTableCell>
            <StyledTableCell align="left">7d%</StyledTableCell>
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
                <div className={classes.coinName}>
                  <img
                    height="25rem"
                    width="25rem"
                    src={coin.image}
                    alt={coin.name}
                  />
                  <b onClick={() => {
                      navigate(`/coins/${coin.id}`, {state: {id: coin.id}});
                    }}
                    
                  >
                    {coin.name}
                  </b>
                  <div>{coin.symbol.toUpperCase()}</div>
                </div>
              </StyledTableCell>
              <StyledTableCell align="left">{currency_formatter(currency, coin.current_price)}</StyledTableCell>
              <StyledTableCell 
                align="left"
                style={{color: Math.sign(coin.price_change_percentage_24h) >= 0 ? '#32cd32': '#FF0000' }}
                
              >
                {numeral(coin.price_change_percentage_24h / 100).format("0.0%")}
              </StyledTableCell>
              <StyledTableCell 
                align="left"
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

const mapStateToProps = (state) => {
  return {
    currency: state.app.currency
  }
}

CoinsTable.propTypes = {
  coins: PropTypes.array.isRequired,
  currency: PropTypes.string
};

export default connect(mapStateToProps)(CoinsTable);