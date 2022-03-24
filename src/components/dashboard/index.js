import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import CoinsTable from '../coinsTable';
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import { getCoins } from './dashboardSlice';
import Particle from './particle';
import { setLoading } from '../../AppSlice';
import Loader from '../../loader';

class Dashboard extends Component {
  constructor(props) {
    super(props);
      this.state = {
    }
  }

  async componentDidMount(){
    const { currency } = this.props;
    this.isLoading(true);
    await this.getCoinsData(currency);
    this.isLoading(false);
  }

  getCoinsData = (currency) => {
    const { dispatchGetCoins } = this.props;
    dispatchGetCoins(currency);
  }

  async componentDidUpdate(prevProps) {
    const { currency } = this.props;
    if(prevProps.currency !== currency) {
      this.isLoading(true);
      setTimeout(async() => {
        await this.getCoinsData(currency);
        this.isLoading(false);
      },1000);
    }
  }

  isLoading = (bool) => {
    const { dispatchSetLoading } = this.props
    dispatchSetLoading(bool);
  }

  render() {
    const { coins, loading } = this.props;
    return (
      <Box>
        <Particle />
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, margin: '25px auto 10px' }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Coin"
            inputProps={{ 'aria-label': 'search coin' }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        { loading ? 
          <Loader /> 
        : 
          <CoinsTable coins={coins} />
        }
      </Box>
    )
  }
}

Dashboard.propTypes = {
  coins: PropTypes.array,
  loading: PropTypes.bool,
  dispatchGetCoins: PropTypes.func,
  dispatchSetLoading: PropTypes.func
};


const mapStateToProps = (state) => {
  return {
    coins: state.dashboard.coins,
    currency: state.app.currency,
    loading: state.app.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetCoins: (currency) => dispatch(getCoins(currency)),
    dispatchSetLoading: (value) => dispatch(setLoading(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
