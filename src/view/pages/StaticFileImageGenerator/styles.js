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
        margin: '4px !important'
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 800,
        background: '#fff',
        boxShadow: 24,
    },
    modalHeader: {
        padding: '18px 15px',
        borderBottom: '1px solid #dbdbdb',
        background: '#fff',
    },
    modalTitle: {
        fontSize: '17px',
        fontWeight: 600,
    },
    modalFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '12px 15px',
        borderTop: '1px solid #dbdbdb',
        background: '#fff',
    },
    modalContent: {
        padding: '8px 15px',
        minHeight: 500,
        maxHeight: 600,
    },
    modalContentScroll: {
        height: 400,
        overflow: 'scroll',
        margin: '32px 0'
    }
}));
  
export default useStyles;