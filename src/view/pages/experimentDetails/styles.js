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
    formField: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 15px 14px 15px',
        background: '#f1f1f1',
        borderRadius: '4px',
        marginBottom: '8px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '32px',
        }
    },
    fieldLabel: {
        maxWidth: "fit-content",
        fontSize: "13px",
        marginTop: "-28px",
        fontWeight: "600",
        marginBottom: "11px",
        background: "#f1f1f1",
        padding: "7px 12px 0 12px",
        borderRadius: "4px",
        marginLeft: "8px",
    },
    fieldLabelBlock: {
        width: '140px',
        fontSize: '13px',
        fontWeight: 600,
        marginBottom: '8px'
    },
    formFieldlBlock: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 8px',
        background: '#f1f1f1',
        borderRadius: '4px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '32px',
        }
    },
    onlyDesktop: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    onlyMobile: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginTop: '8px',
            marginBottom: '8px'
        }
    },
    fieldValue: {
        flex: 1,
        fontSize: '13px'
    },
    code: {
        maxWidth: '600px'
    },
    formTextfield: {
        background: '#fff'
    },
    dataTable: {
        width: '100%',
        border: '1px solid #ccc',
        [theme.breakpoints.down('sm')]: {  
            border: 'none',
        }
    },
    dataList: {
        padding: 1,
        border: '1px solid #ccc',
        [theme.breakpoints.down('sm')]: {  
            border: 'none',
            background: '#f6f6f6',
            borderRadius: '8px'
        }
        
    },
    dataListItem: {
        padding: '8px',
        border: '1px solid #ccc',
        margin: '0 12px 24px 0',
        [theme.breakpoints.down('sm')]: {  
            border: 'none',
            margin: 0,
            padding: '22px 16px 16px 16px'
        }
    },
    title: {
        marginTop: '-12px',
        fontSize: '13px',
        color: '#393939'
    },
    copyIcon: {
        cursor: 'pointer'
    },
}));
  
export default useStyles;