/**
 * 
 * Idle timer component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import React, {useState} from 'react';
import { useIdleTimer } from 'react-idle-timer';

// COMPONENT IMPORT
import {ConfirmModal} from '../../../atom';

// HOOK IMPORT
import {useLogoutHook} from '../logout/useLogoutHook';

// UTILS
import {IDLE_TIMER} from '../../../../utils/constants';

const IdleTimer = () => {
  // LOCAL VARIABLE 
  // IN MILLISECOND
  // 1s = 1000ms
  // 60s = 1m = 60000ms
  // 10m = 600000ms
  const timeout = IDLE_TIMER.timeout; // 10 min = 600000
  const promptBeforeIdle = IDLE_TIMER.promptBeforeIdle; // 4 min 240000

  // STATE VARIABLE
  const [state, setState] = useState('Active');
  console.log(state);
  const [open, setOpen] = useState(false);

  // HOOK
  const {onLogout} = useLogoutHook();

  const onIdle = () => {
    setState('Idle');
    setOpen(false);
    onLogout();
  }

  const onActive = () => {
    setState('Active');
    setOpen(false);
  }

  const onPrompt = () => {
    setState('Prompted');
    setOpen(true);
  }

  const { getRemainingTime, activate } = useIdleTimer({
    onIdle,
    onActive,
    onPrompt,
    timeout,
    promptBeforeIdle,
    throttle: 500
  });

  const handleStillHere = () => {
    activate();
  }

  const onClose = () => {
    setOpen(false);
  }

  return (
    <>{open && <ConfirmModal
      title='Session Expiration Warning'
      content={`Your session will expire in ${Math.ceil(getRemainingTime() / 1000)} minutes. Please click 'Continue' to stay on the screen.`}
      yesLabel='Continue'
      onClose={onClose}
      onConfirm={handleStillHere}
    />}</>
  )
}

export default IdleTimer;