import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        boxSizing: 'border-box',
        padding: '24px 36px',
        background: '#fff',
        minHeight: '96%',
        borderRadius: '8px',
        boxShadow: '1px 1px 2px #d0d0d0',
        [theme.breakpoints.down('sm')]: {
            padding: '20px 20px',
        }
    },
  }));
  
  export default useStyles;