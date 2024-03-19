/**
 * 
 * Login Page component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// COMPONENT IMPORT
import {ConfirmModal} from '../../../atom';

// HOOK IMPORT
import {useLogoutHook} from './useLogoutHook';

const LogoutPage = (props) => {

  // HOOK
  const {onLogout} = useLogoutHook();

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