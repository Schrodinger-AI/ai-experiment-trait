import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        background: '#fff',
        padding: '48px 32px 20px 32px',
        borderRadius: '8px',
        textAlign: 'center'
    },
    icon: {
        fontSize: '48px',
        color: '#f1c40f'
    },
    modalTitle: {
        fontSize: '24px',
        fontWeight: 500,
        margin: '8px 0'
    },
    modalFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '12px 15px',
        background: '#fff',
        gap: '12px',
        marginTop: '16px'
    },
    modalSubtitle: {
        padding: '8px 15px',
        marginTop: '8px',
        color: '#7f7a8a'
    },
}));
  
export default useStyles;