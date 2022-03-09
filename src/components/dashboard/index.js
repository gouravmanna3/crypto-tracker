import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import CoinsTable from '../coinsTable';
import Header from '../header/index';
import { getCoins } from './dashboardSlice';

class Dashboard extends Component {
  constructor(props) {
    super(props);
      this.state = {
    }
  }

  async componentDidMount(){
    await this.getCoinsData();
  }

  getCoinsData = () => {
    const { dispatchGetCoins } = this.props;
    dispatchGetCoins();
  }

  render() {
    const { coins } = this.props;
    return (
      <Box>
        <Header />
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
    coins: state.dashboard.coins
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetCoins: () => dispatch(getCoins())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);