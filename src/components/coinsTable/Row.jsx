import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import PropTypes from 'prop-types';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useNavigate } from "react-router-dom";
import numeral from "numeral";
import { currency_formatter } from '../../utils/utils';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 700,
    padding: '10px 16px',
    color:'white'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    color:'white'
  },
}));

const useStyles = makeStyles((theme) => createStyles({
  coinName: {
    display: 'flex',
    cursor: 'pointer',
    '& *': {
      marginRight: '0.5rem'
    },
    '& b:hover, div:hover': {
      textDecoration: 'underline'
    }
  }
}));

const CoinsTableRow = React.forwardRef(({coin, currency}, ref) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <TableRow
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    ref={ref}
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
  </TableRow>
  )
})

CoinsTableRow.propTypes = {
  coin: PropTypes.object.isRequired,
  currency: PropTypes.string,
};

export default CoinsTableRow;