import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    formRow: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        gap: '12px',
        marginBottom: '24px'
    },
    formTextfield: {
        marginBottom: 0,
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
        gap: '12px'
    },
    chipItem: {
        margin: '4px !important'
    },
    groupCheckbox: {
        display: 'inline-flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '2px',
        fontSize: '13px',
        fontWeight: 600
    }

}));
  
export default useStyles;