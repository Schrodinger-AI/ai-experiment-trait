import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    videoFrame: {
        width: '600px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    title: {
        fontSize: '14px',
        fontWeight: 600
    }
}));
  
export default useStyles;