import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    sideMenuContainer: {
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        left: 0,
        bottom: 0,
        [theme.breakpoints.down('sm')]: {
          zIndex: 2,
        }
    },
    sideMenu: {
      width: '240px',
      background: '#256dd3',
      boxSizing: 'border-box',
      height: '100vh',
      [theme.breakpoints.down('sm')]: {
        zIndex: 2,
        position: 'fixed',
        top: '46px',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
      }
    },
    sideMenuTopLayer: {
        flex: 1,
        boxSizing: 'border-box',
    },
    sideMenuBottomLayer: {
        padding: '15px 15px 10px 10px',
        boxSizing: 'border-box',
        borderTop: '1px solid #2a73dc',
        boxShadow: '0 -1px 0 #2062c1',
        [theme.breakpoints.down('sm')]: {
            height: '120px'
          }
    },
    menu: {
        width: '100%',
        boxSizing: 'border-box',
        color: '#fff',
        padding: '25px 15px 25px 10px',
    },
    menuList: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    noMenuline: {
        borderBottom: 'none'
    },
    menuItem: {
        color: '#fff',
        fontSize: '13px',
        fontWeight: 600,
        borderRadius: '4px',
        padding: '12px',
        marginBottom: '2px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        transition: 'linear all 0.5s',
        '&:hover': {
            color: '#fff',
            background: '#145cc2',
            cursor: 'pointer'
        },
    },
    menuActive: {
        color: '#fff',
        background: '#145cc2',
    },
    menuHeader: {
        textTransform: 'uppercase',
        color: '#fff',
        fontSize: '13px',
        fontWeight: 600,
        marginTop: '32px',
        marginBottom: '8px',
        paddingLeft: '12px',
        letterSpacing: '1px',
    }
}));
  
export default useStyles;