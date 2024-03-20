/**
 * 
 * Menu component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import clsx from 'clsx';
import React, {useContext, useState} from 'react';
import {Box} from '@mui/material';
import {useNavigate} from 'react-router-dom';

// GENERIC COMPONENT
import { Logo, Loader } from '../../../atom';
import { mainMenuItems, utilsMenuItems, helpMenuItems, settingsMenuItems } from './constants';
import Logout from '../../credential/logout';

// ROUTER IMPORT
import * as PATH from '../../../routes/constants';

// CONTEXT
import { menuContext, MENU_ACTION_TYPE } from '../../../../contexts/useMenuContext';

// STYLE IMPORT
import useStyles from './styles';

const Menu = () => {
    // DECLARE STYLE
    const classes = useStyles();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    // LOCAL STATE
    const [isLoading, setLoading] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(isMobile ? false : true);

    // NAVBAR
    const navigate = useNavigate();

    // CONTEXTS
    const context = useContext(menuContext);
    const selectedMenu = context?.state.value || localStorage.getItem("selectedMenu");

    // ON MENU ITEM CLICKED
    const onMenuPress = (link) => {
        if (link === PATH.LOGOUT_PATH) {
            setOpen(true);
        } else {
            setLoading(true);
            navigate(link);
            context?.dispatch({ type: MENU_ACTION_TYPE.UPDATE, payload: link });
            setTimeout(() => setLoading(false), 500);
            localStorage.setItem("selectedMenu", link);
            // ONLY ON MOBILE
            closeMenu();
            window.scrollTo({
                top: 0,
                behavior: 'smooth', // Optionally, you can use smooth scrolling
            });
        }
    };

    // ONLY MOBILE
    const toggleMenu = () => {
        setShowMenu((prevValue) => !prevValue);
    }

    // ONLY MOBILE
    const closeMenu = () => {
        if (isMobile) {
            setShowMenu(false);
        }
    }

    return (
        <Box className={classes.sideMenuContainer}>
            <Logo {...{toggleMenu, showMenu}}/>
            {showMenu && <Box className={classes.sideMenu}>
                {isLoading && <Loader/>}
                <Box className={classes.sideMenuTopLayer}>
                    
                    <Box className={classes.menu}>
                        <ul className={classes.menuList}>
                            {mainMenuItems.map((item) => (
                                <li key={item.id} onClick={() => onMenuPress(item.link)} className={clsx(classes.menuItem, item.link === selectedMenu && classes.menuActive)}>{item.icon}&nbsp;&nbsp;{item.label}</li>
                            ))}
                        </ul>
                        <Box className={classes.menuHeader}>Utils</Box>
                        <ul className={clsx(classes.menuList)}>
                            {utilsMenuItems.map((item) => (
                                <li key={item.id} onClick={() => onMenuPress(item.link)} className={clsx(classes.menuItem,  item.link === selectedMenu && classes.menuActive)}>{item.icon}&nbsp;&nbsp;{item.label}</li>
                            ))}
                        </ul>
                        <Box className={classes.menuHeader}>Setting</Box>
                        <ul className={clsx(classes.menuList)}>
                            {settingsMenuItems.map((item) => (
                                <li key={item.id} onClick={() => onMenuPress(item.link)} className={clsx(classes.menuItem,  item.link === selectedMenu && classes.menuActive)}>{item.icon}&nbsp;&nbsp;{item.label}</li>
                            ))}
                        </ul>
                    </Box>
                </Box>
                <Box className={classes.sideMenuBottomLayer}>
                    <ul className={clsx(classes.menuList)}>
                        {helpMenuItems.map((item) => (
                            <li key={item.id} onClick={() => onMenuPress(item.link)} className={clsx(classes.menuItem,  item.link === context?.state.value && classes.menuActive)}>{item.icon}&nbsp;&nbsp;{item.label}</li>
                        ))}
                    </ul>
                </Box>
                {isOpen && <Logout onClose={() => setOpen(false)}/>}
            </Box>}
        </Box>
    )
}

export default Menu;