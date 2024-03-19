/**
 * 
 * Login Page component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import {useNavigate} from 'react-router-dom';

// COMPONENT IMPORT
import {ConfirmModal} from '../../../atom';

// ROUTER IMPORT
import * as PATH from '../../../routes/constants';

const LogoutPage = (props) => {

  // NAVBAR
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate(PATH.LOGIN_PATH);
  };

  return (
    <ConfirmModal
      title='You want to logout?'
      content='Logging out will end your current session and require you to sign in again to access your account.'
      yesLabel='Logout'
      onClose={props.onClose}
      onConfirm={onLogout}
    />
  )
}

export default LogoutPage;