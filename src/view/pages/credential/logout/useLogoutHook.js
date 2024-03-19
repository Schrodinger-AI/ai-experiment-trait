/**
 * 
 * Logout useHook component
 * @author - NA 
 * @date - 13th March, 2024
 * 
 */
// GENERIC IMPORT
import {useNavigate} from 'react-router-dom';

// UTILS
import * as PATH from '../../../routes/constants';

export function useLogoutHook() {

  // NAVBAR
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate(PATH.LOGIN_PATH);
  };

  return {
    onLogout
  }
}