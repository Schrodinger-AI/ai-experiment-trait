/**
 * 
 * Auth component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

// COMPONENT IMPORT
import {DarkLoader} from '../../../atom';

// ROUTER IMPORT
import * as PATH from '../../../routes/constants';

const Auth = () => {
    // LOCAL STATE
    const [isLoading, setLoading] = useState(false);

    // NAVBAR
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    
    // LOCAL VARIABLE
    const nonTokenPath = [PATH.LOGIN_PATH];
    
    const checkAuth = () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        // IF USER HAVE TOKEN AND TRY TO VISIT LOGIN SCREEN
        if (token) {
            if (nonTokenPath.includes(currentPath)) {
                navigate(PATH.HOME_PATH);
            }
        } else {
            // IF USER DONT HAVE TOKEN AND TRY TO VISIT AFTER LOGIN SCREEN
            if (!nonTokenPath.includes(currentPath)) {
                navigate(PATH.LOGIN_PATH);
            }
        }
        setLoading(false);
    }
    useEffect(() => checkAuth(), []);
    if (isLoading) return <DarkLoader/>;
}

export default Auth;