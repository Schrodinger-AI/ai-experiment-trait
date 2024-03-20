import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  app: {
    background: '#f6f6fa',
    minHeight: '100vh',
  },
  layout: {
    display: 'flex',
    flex: 1,
    background: '#f6f6f6',
    boxSizing: 'border-box',
  },
  bodyContent: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      marginTop: '45px',
      zIndex: 1
    }
  },
  routerContainer: {
    padding: '25px',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      padding: '15px 10px',
    }
  }
}));
  
export default useStyles;