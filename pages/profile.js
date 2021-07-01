import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSession, getSession } from 'next-auth/client';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  flex_item: {
    display: 'flex',

    '& .text': {
      marginLeft: 20
    }
  },
  custom_box: {
    '& button': {
      width: '100%'
    }
  }
}));

const ProfilePage = () => {
  const classes = useStyles();
  // const [ session ] = useSession();
  // const user = session && session.user;

  return (
    <div>
      <div>
        {/* <Avatar alt="Remy Sharp" src={user && user.image} />
        <div>          
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div> */}
        <Typography variant="h4" gutterBottom color={'primary'}>
          Profile
        </Typography>
        <div className={classes.flex_item}>
          <Avatar alt="" src={'/images/user.png'} className={classes.large}/>
          <div className="text">
            <Typography variant="subtitle1" gutterBottom >
              Jonathan Greensted
            </Typography>
            <Typography variant="body2" gutterBottom >
              jonathan@greensted.com
            </Typography>
          </div>
        </div>
        <Box my={3}>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipsicing elit. IN et prottitor diam.
          </Typography>
        </Box>
        <Box my={1} className={classes.custom_box}>
          <Button variant="outlined" color="primary">
            Edit Profile
          </Button>          
        </Box>
        <Box my={1} className={classes.custom_box}>
          <Button variant="outlined" color="primary">
            Preferences
          </Button>        
        </Box>
        <Box my={1} className={classes.custom_box}>
          <Button variant="outlined" color="primary">
            Add Business
          </Button>
        </Box>        
      </div> 
      <div>
        <Typography variant="h4" gutterBottom color={'primary'}>
          Companies
        </Typography>
      </div>    
    </div>
  );
};

export default ProfilePage;

// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   return {
//     props: { session }
//   }
// }
