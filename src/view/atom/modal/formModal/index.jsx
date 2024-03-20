/* eslint-disable react/prop-types */
/**
 * 
 * Form Modal component
 * @author - NA 
 * @date - 13th March, 2024
 * 
 */
// GENERIC IMPORT
import clsx from 'clsx';
import React from 'react';
import {Box, Modal, Button} from '@mui/material';


// STYLE IMPORT
import useStyles from './styles';

const ConfirmModal = (props) => {
  // DECLARE STYLE
  const classes = useStyles();

  // LOCAL VARIABLE
  const {onConfirm, yesLabel = 'Confirm', noLabel = 'Close', title, onClose, isYesButtonDisabled = false, size = 'medium', hidePrimaryBtn = false} = props;

  const sizeContentSwitch = {
    small: classes.modalSmallContent,
    medium: classes.modalMediumContent,
    large: classes.modalLargeContent,
  }

  const sizeModalHeightSwitch = {
    small: classes.modalSmall,
    medium: classes.modalMedium,
    large: classes.modalLarge,
  }
  return (
    <Modal open>
      <Box className={clsx(classes.modal, sizeModalHeightSwitch[size])}>
        <Box className={classes.modalHeader}>
          <Box className={classes.modalTitle}>{title}</Box>
        </Box>
        <Box className={clsx(sizeContentSwitch[size])}>
          {props.children}
        </Box>
        <Box className={classes.modalFooter}>
          <Button variant="outlined" className={classes.btn} onClick={onClose} >{noLabel}</Button>
          {!hidePrimaryBtn && <Button variant="contained" className={classes.btn} onClick={onConfirm} disabled={isYesButtonDisabled}>{yesLabel}</Button>}
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
