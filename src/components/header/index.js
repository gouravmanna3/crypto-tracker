import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { 
  Select, AppBar, Toolbar, Typography, Container, 
  MenuItem, FormControl, InputLabel } from '@mui/material';
import { connect, useDispatch } from 'react-redux';
import { setCurrency } from '../../AppSlice';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const Header = ({currency}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onCurrencyChange = (e) => {
    dispatch(setCurrency(e.target.value));
  }

  return (
    <ThemeProvider theme={darkTheme}>
        <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Typography
                  variant="h6" 
                  component="div" 
                  sx={{ flexGrow: 1 }}
                  onClick={() => {
                    navigate('/');
                  }}
                  style={{cursor: 'pointer'}}
                >
                  Cryptoholic
                </Typography>
                <FormControl>
                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currency}
                  label="Currency"
                  style={{
                    width: 100,
                    height: 40,
                    marginRight: 15
                  }}
                  onChange={onCurrencyChange}
                >
                  <MenuItem value={'inr'}>INR</MenuItem>
                  <MenuItem value={'usd'}>USD</MenuItem>
                </Select>
                </FormControl>
              </Toolbar>
            </Container>
          </AppBar>
        </ThemeProvider>
  )
}

const mapStateToProps = (state) => {
  return {
    currency: state.app.currency
  }
}

export default connect(mapStateToProps)(Header);