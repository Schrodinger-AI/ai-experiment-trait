import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        background: '#256dd3',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
    },
    loginContainer: {
        display: 'flex',
        width: 700,
        gap: '40px',
        marginTop: '-100px',
        [theme.breakpoints.down('sm')]: {
            width: '300px',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            flexDirection: 'column',
            marginTop: '-30%',
        }
    },
    loginBox: {
        width: 400,
        border: '1px solid #fff',
        padding: '24px',
        borderRadius: '8px',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
        }
    },
    onlyDesktop: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    loginTitle: {
        fontSize: '18px',
        fontWeight: 600
    },
    loginSubTitle: {
        fontSize: '13px',
        fontWeight: 400,
        marginTop: '4px'
    },
    loginContent: {
        flex: 1,
        color: '#fff',
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        }
    },
    title: {
        fontSize: '40px',
        fontWeight: 500,
        display: 'inline-flex',
        alignItems: 'center',
        paddingBottom: '16px',
        borderBottom: '1px solid #417dd3',
        whiteSpace: 'nowrap',
        fontFamily: "'Caveat', cursive",
    },
    subtitle: {
        borderTop: '1px solid #0055cc',
        paddingTop: '16px',
        fontSize: '20px',
        fontWeight: 600,
        marginBottom: '24px',
        lineHeight: '24px'
    },
    info: {
        fontSize: '13px',
        fontWeight: 400,
        lineHeight: '21px'
    },
    link: {
        cursor: 'pointer',
        color: '#256dd3',
        display: 'inline-block',
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline',
        }
    },
}));
  
export default useStyles;