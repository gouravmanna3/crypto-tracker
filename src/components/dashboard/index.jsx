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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { setPaginationPage } from '../dashboard/dashboardSlice';

const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 0,
      xs: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  }
})

class Dashboard extends Component {
  constructor(props) {
    super(props);
      this.state = {
        searchQuery: '',
        loader: false
    }
  }

  async componentDidMount(){ 
    this.isLoading(true);
    await this.getCoinsData();
    this.isLoading(false);
  }

  getCoinsData = () => {
    const { dispatchGetCoins, page, currency } = this.props;
    dispatchGetCoins(currency, page);
  }

  async componentDidUpdate(prevProps) {
    const { currency, page } = this.props;
    if(prevProps.currency !== currency) {
      this.isLoading(true);
      await this.getCoinsData();
        //this.isLoading(false);
      setTimeout(async() => {
        this.isLoading(false);
      },1000);
    }

    if(prevProps.page !== page && !this.state.searchQuery) {
      this.getMoreCoins();
    }
  }

  isLoading = (bool) => {
    const { dispatchSetLoading } = this.props
    dispatchSetLoading(bool);
  }

  onSearch = (e) => {
    this.setState({searchQuery: e.target.value.toLowerCase()})
  }

  searchCoin = (coins) => {
    return coins.filter(coin => coin.name.toLowerCase().includes(this.state.searchQuery));
  }

  changePage = async () => {
    const { page, dispatchSetPaginationPage, dispatchGetCoins, currency } = this.props;
    await dispatchSetPaginationPage(page + 1);
  }

  getMoreCoins = async () => {
    this.setState({loader: true})
    await this.getCoinsData();
    setTimeout(async() => {
      this.setState({loader: false})
    },1000);
  }

  render() {
    const { coins, loading, page } = this.props;
    return (
      <ThemeProvider theme={theme}>
      <Box>
        <Particle />
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: { xxs: 230, xs: 350, sm: '30rem', lg: '25rem' },  margin: '25px auto 10px' }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Coin"
            inputProps={{ 'aria-label': 'search coin' }}
            onChange={this.onSearch}
          />
          <IconButton sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        { loading ? 
          <Loader /> 
        : 
          <CoinsTable coins={this.searchCoin(coins)} searching={!!this.state.searchQuery} changePage={this.changePage} loader={this.state.loader} />
        }
      </Box>
      </ThemeProvider>
    )
  }
}

Dashboard.propTypes = {
  coins: PropTypes.array,
  loading: PropTypes.bool,
  dispatchGetCoins: PropTypes.func,
  dispatchSetLoading: PropTypes.func,
  dispatchSetPaginationPage: PropTypes.func
};


const mapStateToProps = (state) => {
  return {
    coins: state.dashboard.coins,
    page: state.dashboard.page,
    currency: state.app.currency,
    loading: state.app.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetCoins: (currency, page) => dispatch(getCoins(currency, page)),
    dispatchSetLoading: (value) => dispatch(setLoading(value)),
    dispatchSetPaginationPage: (page) => dispatch(setPaginationPage(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
