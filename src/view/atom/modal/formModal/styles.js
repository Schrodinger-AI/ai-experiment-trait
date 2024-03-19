import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#fff',
        boxShadow: 24,
    },
    modalSmall: {
        width: 540,
    },
    modalMedium: {
        minWidth: 700,
    },
    modalLarge: {
        width: '90%',
        boxSizing: 'border-box',
        margin: '0 auto',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        transform: 'none',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
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
        gap: '12px',
    },
    modalMediumContent: {
        padding: '8px 15px',
        height: 500,
        overflow: 'scroll',
    },
    modalLargeContent: {
        padding: '8px 15px',
        overflow: 'scroll',
        height: 'auto',
        flex: 1
    },
    modalSmallContent: {
        maxHeight: 130,
        display: 'flex',
        alignItems: 'center',
        padding: '8px 15px',
        flex: 1,
        justifyContent: 'center'
    },
}));
  
export default useStyles;