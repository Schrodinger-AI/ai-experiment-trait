/* eslint-disable react/prop-types */
/**
 * 
 * Config File Setting component
 * @author - NA 
 * @date - 19th March, 2024
 * 
 */
// GENERIC IMPORT
import React, { useState } from 'react';
import {Box, TextField} from '@mui/material';

// OTHER IMPORT
import {Loader, FormModal} from '../../../atom';

// UTILS IMPORT
import useNotification from '../../../../utils/notification';

const AddTrait = (props) => {

    // DECLARE NOTIFICATION
    const setNotification = useNotification();

    // STATE VARIABLE
    const [newTrait, setNewTrait] = useState('');

    const {state, setState, traitObject, onClose, selectedTraitType} = props;
    const [isLoading, setLoading] = useState(false);

    const onAdd = () => {
        if (!isFormValid()) {
            return;
          }
        setLoading(true);
        traitObject[selectedTraitType].push({value: newTrait, isChecked: true});
        setState({...state, traitsFile: JSON.stringify(traitObject)});

        setNotification.success("New trait created successfully.");
        props.onClose();
    }

    const isFormValid = () => {
        if (!newTrait.trim().length) {
          setNotification.error("Please provide the trait name.");
        } else {
          return true;
        }
        return false;
    };

    return (
        <FormModal
        title='Add new trait'
        yesLabel='Add'
        onClose={onClose}
        onConfirm={onAdd}
        size='small'
    >
        <Box mt={2} mb={2} width={'100%'}>
            {isLoading && <Loader/>}
            <TextField label="New trait" variant="outlined" value={newTrait}
            fullWidth placeholder='Please enter the new trait' size='small'
            onChange={(event) => setNewTrait(event.target.value)}/>
        </Box>
        </FormModal>
    );
};

export default AddTrait;