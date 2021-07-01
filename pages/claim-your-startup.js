import React, { useEffect, useState } from 'react';
import { useSession, getSession } from 'next-auth/client';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  custom_input: {
    width: '100%'
  },
  search_btn: {
    height: 56,
    width: '100%'
  },
  company_item: {
    '& .title': {
      color: '#275ca0'
    },

    '& .description': {
      color: '#747b7e',
      fontSize: 15,
      fontWeight: 600
    },

    '& .address': {
      fontSize: 15,
      fontWeight: 600
    }
  }
}));

const ClaimStartUp = () => {
  const classes = useStyles();
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [inputError, setInputError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [session] = useSession();
  const user = session && session.user;

  const handleChange = (e) => {
    setSearchKey(e.target.value);
    setInputError(false);
    setErrorText('');
  }

  useEffect(() => {
    console.log('user', user);
    if (user === null) {
      window.location.href = '/login'
    }
  }, [user])

  const handleSearch = () => {
    if(!searchKey) {
      setInputError(true);
      setErrorText('Please input the company name or number');
      return;
    }

    axios.get(`https://api.company-information.service.gov.uk/search?q=` + searchKey, {headers: { Authorization: `Basic MjFiZWQ0YzctY2Y1MC00NjZjLTlhMTQtYjEzMGRmNTNjZmNhOg==`}})
      .then(res => {
        setFilteredCompanies(res.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom color={'primary'}>
        Claim your StartUp
      </Typography>
      <Typography variant="body1" gutterBottom>
        Enter your company name or number and we'll look you up at Companies House.
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={8}>
          <Box mt={7} >
            <Grid container spacing={3}>
              <Grid item md={4}>
                <Typography variant="h5" gutterBottom>
                  Company Name
                </Typography>
              </Grid>
              <Grid item md={6}>
                <TextField 
                  id="company-info" 
                  label="Company Name" 
                  variant="outlined" 
                  className={classes.custom_input} 
                  value={searchKey} 
                  onChange={handleChange}
                  error={inputError}
                  helperText={errorText}
                />
              </Grid>
              <Grid item md={2}>
                <Button variant="contained" color="primary" className={classes.search_btn} onClick={handleSearch}>
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box mt={3} borderTop={1} pt={3}>
            {
              filteredCompanies && filteredCompanies.length > 0 ?
                filteredCompanies.map((company, index) => (
                  <Grid container spacing={3} key={index} className={classes.company_item}>
                    <Grid item md={10}>
                      <Typography variant="h5" gutterBottom className="title">
                        {company.title}
                      </Typography>
                      <Typography variant="h5" gutterBottom className="description">
                        {company.description}
                      </Typography>
                      <Typography variant="h5" gutterBottom className="address">
                        {company.address_snippet}
                      </Typography>
                    </Grid>
                    <Grid item md={2}>
                      <Button variant="outlined" color="primary" className={classes.search_btn} href={"/companies/" + company.company_number} disabled={!company.company_number}>
                        Claim
                      </Button>
                    </Grid>
                  </Grid>
                )) : 
                <Grid container spacing={3} className={classes.company_item}>
                  <Typography variant="h5" gutterBottom color='primary'>
                    There is no matched company
                  </Typography>
                </Grid>
            }            
          </Box>         
        </Grid>
        <Grid item md={4}>

        </Grid>
      </Grid>
      
    </div>
  );
};

export default ClaimStartUp;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session }
  }
}
