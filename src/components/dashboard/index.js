import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import CoinsTable from '../coinsTable';
import { getCoins } from './dashboardSlice';

class Dashboard extends Component {
  constructor(props) {
    super(props);
      this.state = {
    }
  }

  async componentDidMount(){
    const { currency } = this.props
    await this.getCoinsData(currency);
  }

  getCoinsData = (currency) => {
    const { dispatchGetCoins } = this.props;
    dispatchGetCoins(currency.toLowerCase());
  }

  async componentDidUpdate(prevProps) {
    const { currency } = this.props;
    if(prevProps.currency !== currency)
    await this.getCoinsData(currency); 
  }

  render() {
    const { coins } = this.props;
    return (
      <Box>
        <CoinsTable coins={coins} />
      </Box>
    )
  }
}

Dashboard.propTypes = {
  coins: PropTypes.array,
  dispatchGetCoins: PropTypes.func
};


const mapStateToProps = (state) => {
  return {
    coins: state.dashboard.coins,
    currency: state.app.currency
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetCoins: (currency) => dispatch(getCoins(currency))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);