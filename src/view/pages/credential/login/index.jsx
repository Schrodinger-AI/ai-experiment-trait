/**
 * 
 * Login Page component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import {useState} from 'react';
import {Box, TextField, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

// COMPONENT IMPORT
import Header from '../../common/header';
import {Loader} from '../../../atom';

// ROUTER IMPORT
import * as PATH from '../../../routes/constants';
import Auth from '../auth';

// ICON IMPORT
import LogoIcon from '../../../../assets/img/aelf-logo.png';

// UTILS
import {LOGIN_TOKEN} from '../../../../utils/constants';
import useNotification from '../../../../utils/notification';
import {FEATURE} from '../../../../utils/feature';

// API
import {LOGIN_API} from '../../../../api/constants';

// STYLE IMPORT
import useStyles from './styles';

const LoginPage = () => {
  // DECLARE STYLE
  const classes = useStyles();

  // DECLARE NOTIFICATION AND NAVIDATE
  const setNotification = useNotification();
  const navigate = useNavigate();

  // STATE VARIABLE
  const [isLoading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  const onLogin = async () => {
    if (!isFormValid()) {
      return;
    }
    setLoading(true);
    try {
      /* const params = {token}
      const response = await axios.post(
        LOGIN_API,{...params},
              {
              headers: {
                  'Content-Type': 'application/json',
              },
          }
      );
      if (response.data) {
        const responseToken = response.data;
        navigate(PATH.HOME_PATH);
        localStorage.setItem('token', responseToken);
      } else {
        setNotification.error("Invalid login credentials");
      } */
      if (FEATURE.DISABLE_LOGIN_CHECK || token === LOGIN_TOKEN) {
        navigate(PATH.HOME_PATH);
        localStorage.setItem('token', token);
      } else {
        setNotification.error("Invalid login credentials");
      }
    } catch(error) {
      console.log("Error: ", error);
      setNotification.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    if (!token.trim().length) {
      setNotification.error("Please provide the token to login.");
    } else {
      return true;
    }
    return false;
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onLogin();
    }
  };

  return (
    <>
      { isLoading && <Loader/>} 
      <Header/>
      <Box className={classes.container}>
        <Box className={classes.loginContainer}>
          <Box className={classes.loginContent}>
            <Box className={classes.title}>
            <img src={LogoIcon}  alt="Logo" height={30}/>&nbsp;Traits Experiment</Box>
            <Box className={classes.subtitle}>We make digital product that drive you to stand out.</Box>
            <Box className={classes.info}>We write code to create NFT by interacting with artificial intelligence using different traits.</Box>
          </Box>
          <Box className={classes.loginBox}>
            <Box>
              <Box className={classes.loginTitle}>Login</Box>
              <Box className={classes.loginSubTitle}>Don't have an account? Please account admin</Box>
            </Box>
            <TextField type='password' label="Token" variant="outlined" 
            fullWidth placeholder='Please enter the token' value={token} size='small'
            onChange={(event) => setToken(event.target.value)} onKeyDown={handleKeyDown}/>
            <Button variant="contained" fullWidth onClick={onLogin}>Login</Button>
          </Box>
        </Box>
      </Box>
      <Auth/>
    </>
  )
}

export default LoginPage;