import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    formRow: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        gap: '12px',
        marginBottom: '24px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            marginBottom: 0,
            gap: 0,
        }
    },
    formTextfield: {
        marginBottom: 0,
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px !important',
        }
    },
    link: {
        cursor: 'pointer',
        color: '#256dd3',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
        }
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        [theme.breakpoints.down('sm')]: {
            flex: 1,
            flexDirection: 'column'
        }
    },
    btn: {
        [theme.breakpoints.down('sm')]: {
            flex: 1,
        }
    },
    title: {
        fontSize: '14px',
        fontWeight: 600,
        textTransform: 'capitalize'
    },
    chipItem: {
        margin: '4px !important',
        [theme.breakpoints.down('sm')]: {
            minHeight: '32px !important',
            height: 'auto !important',
            padding: '8px 5px !important',
        }
    },
    modalContentScroll: {
        height: 400,
        overflow: 'scroll',
        margin: '32px 0',
        [theme.breakpoints.down('sm')]: {
            height: 'auto',
        }
    }
}));
  
export default useStyles;