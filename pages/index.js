import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  title: {
    fontWeight:700,
  },
  image_part: {
    width: "100%"
  },
  link_group: {
    width: '100%',
    margin: '30px 0',
    borderBottom: '2px solid ' + theme.palette.primary.main
  },
  image_group: {
    width: '100%',
    margin: '30px 0',
  },
  link_btn: {
    width: "100%",
    marginBottom: 10
  },
  social_link: {
    margin: '0 5px'
  },
  btn_link: {
    // margin: '8px 0',

    '& a' : {
      width: '100%'
    },
    
    '& button': {
      width: '100%',
      fontSize: '1rem'
    }
  },
  special_text: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center'
  },
  totalcompanies: {
    textTransform: 'none'
  },
  claimBtn:{
    fontSize:'1rem',
    minWidth:200
  }
  
}));

const links = [
  { text: 'For Startups and Scaleups', link: '#' },
  { text: 'For Investors', link: '#' },
  { text: 'For Researchers and Press', link: '#' },
];

function Home() {
  const classes = useStyles();
  const [totalCompanies, setTotalCompanies] = useState();
  const [totalSought, setTotalSought] = useState();

  useEffect(() => {
    axios.get(`https://sone-api.azure-api.net/fi-api/companies/totals`)
      .then(res => {
        console.log('res', res);
        setTotalCompanies(res.data.totalcompanies);
        setTotalSought(res.data.totalsought);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Typography variant="h5" className={classes.title} gutterBottom color={'primary'}>
            Welcome to Funding Index
          </Typography>
          <Box mb={2} >
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus nunc, commodo at est ut, aliquam laoreet nunc.
            </Typography>
          </Box>
          <Box mb={2} style={{ textAlign: 'center' }}>
            <Button variant="outlined" color="primary" className={classes.claimBtn} href={'/claim-your-startup'}>
              Claim your business
            </Button>
          </Box>
          <Box >
            <Typography variant="body1" mb={2}>
              Sed vehicula luctus porta. Aenean ultrices pulvinar quam eu aliquet. Etiam urna velit, malesuada ac imperdiet id, maximus in nisl. Praesent ipsum neque, commodo at erat vitae, fermentum semper velit.
            </Typography>
          </Box>                    
        </Grid>        
        <Grid item xs={12} md={7}>
          <Typography variant="body2" gutterBottom color={'primary'} className={classes.title}>
            Funding Sought Today
          </Typography>
          <Grid container spacing={1} className={classes.btn_link}>
            <Grid item xs={6} >
              <Button variant="contained" color="primary">
                <CurrencyFormat value={totalSought} displayType={'text'} thousandSeparator={true} prefix={'£'} />
              </Button>
            </Grid>
            <Grid item xs={6} >
              <Button variant="contained" color="primary" className={classes.totalcompanies}>
                {totalCompanies} Companies
              </Button>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
      <Grid item>
        <Box mt={2} >
          <Typography variant="body1" mb={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus nunc, commodo at est ut, aliquam laoreet nunc.
          </Typography>
        </Box>        
      </Grid>
      {/* <div>
        <Typography variant="h6" gutterBottom color={'primary'}>
          Sponsors
        </Typography>
      </div>      */}
    </div>
  )
}

export default Home
