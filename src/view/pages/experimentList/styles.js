import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    rowHeader: {
        display: 'flex',
        flex: 1,
        color: '#e4e2f1',
        background: '#36304a',
        boxSizing: 'border-box',
        borderRadius: ' 4px 4px 0 0',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
            borderRadius: 0,
        }
    },
    rowHeaderTitle: {
        fontSize: '13px',
        fontWeight: 600,
        textTransform: 'uppercase',
        textAlign: 'left',
        padding: '10px 20px',   
        boxSizing: 'border-box',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    rowDataHeader: {
        background: '#f6f6f6',
        boxSizing: 'border-box',
        borderBottom: '1px solid #e5e5e5',
        marginBottom: '1px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column !important',
            margin: 0
        }
    },
    rowFirstData: {
        [theme.breakpoints.down('sm')]: {
            color: '#e4e2f1',
            background: '#36304a',
            boxSizing: 'border-box',
            borderRadius: 0,
        }
    },
    rowData: {
        fontSize: '13px',
        textAlign: 'left',
        padding: '10px 20px',   
        boxSizing: 'border-box',
        [theme.breakpoints.down('sm')]: {
            flex: 1,
            display: 'flex',
            maxWidth: '100% !important',
            alignItem: 'center',
        }
    },
    truncateContent: {
        width: '100px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            whiteSpace: 'normal',
            overflow: 'unset',
        }
    },
    onlyMobileLabel: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            width: '100px',
            minWidth: '100px',
            display: 'inline-block',
        }
    },
    link: {
        cursor: 'pointer',
        color: '#256dd3',
        '&:hover': {
            textDecoration: 'underline',
        }
    },
    underlink: {
        cursor: 'pointer',
        color: '#256dd3',
        '&:hover': {
            textDecoration: 'underline',
        }
    }
}));
  
export default useStyles;