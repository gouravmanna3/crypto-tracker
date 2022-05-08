import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import NoData from '../dashboard/noDataFound';
import { setPaginationPage } from '../dashboard/dashboardSlice';
import CoinsTableRow, { StyledTableCell } from './Row';


const useStyles = makeStyles((theme) => createStyles({
  tableContainer: {
    display: 'flex',
    marginTop: '2em',
    color: 'white'
  },
  loader: {
    color: 'white',
    textAlign: 'center',
    marginBottom: '2em'
  }
}));

const CoinsTable = ({ coins, currency, changePage, loader, searching }) => {
  const classes = useStyles();
  let observer = useRef();
  const lastCoinRefElement = useCallback(node => {
    if(loader) return;
    if(observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
        changePage();
      }
    })
    if (node) {
      observer.current.observe(node);
    }
  },[loader]);

  return !coins.length ? 
    <NoData />
    :
    <>
    <TableContainer className={classes.tableContainer}>
      <Table sx={{ minWidth: 650, width: '1000px', margin: '0 auto', zIndex: 1 }} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="left">Coin</StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
            <StyledTableCell align="left">24h%</StyledTableCell>
            <StyledTableCell align="left">7d%</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins?.map((coin, index) => {
            if(coins.length === index+1 && !searching) {
              return <CoinsTableRow ref={lastCoinRefElement} coin={coin} currency={currency} key={coin.id}/>
            }
            
            return <CoinsTableRow coin={coin} currency={currency} key={coin.id} /> 
          }
          )}
        </TableBody>
      </Table>
    </TableContainer>
   {loader && <p className={classes.loader}>Loading....</p>} 
    </>
  
}

const mapStateToProps = (state) => {
  return {
    currency: state.app.currency,
    page: state.dashboard.page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetPaginationPage: (page) => dispatch(setPaginationPage(page))
  }
}

CoinsTable.propTypes = {
  coins: PropTypes.array.isRequired,
  currency: PropTypes.string,
  searchQuery: PropTypes.string,
  changePage: PropTypes.func,
  page: PropTypes.number,
  loader: PropTypes.bool,
  searching: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinsTable);