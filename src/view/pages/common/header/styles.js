import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    padding: '16px 25px 17px 20px',
    background: '#145cc2',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0
  },
  pageHeaderContainer: {
    borderBottom: '1px solid #ccc',
    paddingBottom: '16px',
    marginBottom: '24px',
    boxShadow: '0 1px 0 #ffffff',

  },
  pageHeaderTitle: {
    fontSize: '20px',
    fontWeight: 500,
    marginBottom: '4px',
  },
  pageHeaderSubtitle: {
    fontSize: '14px',
    color: '#5b5d71',
  }
}));
  
export default useStyles;