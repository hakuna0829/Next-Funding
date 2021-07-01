import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {

  }
}));

function Login() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={10}>
          <Typography variant="h4" gutterBottom color={'primary'}>
            Sign in to view your Business
          </Typography>
          <Box mb={3} pb={3}>
            <Typography variant="body1">
              Please sign-in using your Google Accounts confirm who you are
            </Typography>
          </Box>
          <Box mb={3} pb={3} style={{ textAlign: 'center' }}>
            <Button variant="outlined" color="primary" href={'/api/auth/signin'}>
              Sign in with Google
            </Button>
          </Box>
          <Box mb={3} pb={3} style={{ textAlign: 'center' }}>
            <Button variant="outlined" color="primary" href={'/'}>
              Cancel
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={2}></Grid>
      </Grid>
    </div>
  )
}

export default Login