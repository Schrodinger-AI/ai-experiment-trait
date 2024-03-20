import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    logoContainer: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        padding: '9px 25px 10px 20px',
        background: '#145cc2',
        [theme.breakpoints.down('sm')]: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
        }
    },
    logoName: {
        fontSize: '22px',
        fontWeight: 700,
        color: '#fff',
        marginLeft: '12px',
        fontFamily: "'Caveat', cursive",
    },
    mobileMenuIcon: {
        display: 'none',
        color: '#fff',
        position: 'absolute',
        right: '15px',
        fontSize: '20px',
        [theme.breakpoints.down('sm')]: {
            display: 'inline-block'
        }
    }
  }));
  
  export default useStyles;