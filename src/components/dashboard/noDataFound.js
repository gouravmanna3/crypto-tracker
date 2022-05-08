import React from 'react';
import { Box } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const NoData = () => {

  const useStyles = makeStyles((theme) => createStyles({
    container: {
      color: 'white',
      textAlign: 'center'
    }
  }));

  const classes = useStyles();
  return (
    <Box className={classes.container}>
        <h4>Sad no result!</h4>
        <p>We cannot find the coin you are searching for, maybe a little spelling mistake?</p>
    </Box>
  )
}

export default NoData;