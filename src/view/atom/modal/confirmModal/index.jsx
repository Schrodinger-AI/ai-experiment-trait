/**
 * 
 * Confirm Modal component
 * @author - NA 
 * @date - 13th March, 2024
 * 
 */
// GENERIC IMPORT
import {Box, Modal, Button} from '@mui/material';


// STYLE IMPORT
import useStyles from './styles';

const ConfirmModal = (props) => {
  // DECLARE STYLE
  const classes = useStyles();

  // LOCAL VARIABLE
  const {onConfirm, yesLabel = 'Confirm', noLabel = 'Cancel', title, onClose, content} = props;

  return (
    <Modal open>
      <Box className={classes.modal}>
        <Box className={classes.icon}><i className="fa fa-exclamation-triangle"></i></Box>
        <Box className={classes.modalTitle}>{title}</Box>
        <Box className={classes.modalSubtitle}>
          {content}
        </Box>
        <Box className={classes.modalFooter}>
          <Button variant="contained" onClick={onConfirm} fullWidth>{yesLabel}</Button>
          <Button variant="outlined" onClick={onClose} fullWidth>{noLabel}</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
