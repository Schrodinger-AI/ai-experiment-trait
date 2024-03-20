import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    cardImageContainer: {
        textAlign: 'center'
    },
    cardImageTitle: {
        fontSize: '14px',
        fontWeight: 600,
        textAlign: 'center',
        padding: '8px 0',
    },
    cardImage: {
        transform: 'scale(1)',
        borderRadius: '4px',
        boxShadow: '1px 1px 2px #ccc',
        '&:hover': {
            transform: 'scale(1.1)',
            transition: 'all 0.1s linear',
            cursor: 'pointer',
        },
        [theme.breakpoints.down('sm')]: {
            width: 'auto !important',
        }
    }
  }));
  
  export default useStyles;