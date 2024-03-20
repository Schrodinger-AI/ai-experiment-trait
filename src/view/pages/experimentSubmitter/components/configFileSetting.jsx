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
import {Box, TextField, Alert} from '@mui/material';

// UTILS IMPORT
import useNotification from '../../../../utils/notification';

// COMPONENT IMPORT
import {FormModal} from '../../../atom';

const ConfigFileSetting = (props) => {

    // DECLARE NOTIFICATION
    const setNotification = useNotification();

    // STATE VARIABLE
    const {state, setState} = props;
    const [isLoading, setLoading] = useState(false);
    console.log(props?.configFileObject)
    const isUpdatable = !!props?.configFileObject;
    const configFileObject = props?.configFileObject ? JSON.parse(props.configFileObject) : {};
    const [prefix, setPrefix] = useState(typeof configFileObject == 'object' && configFileObject?.prefix ? configFileObject?.prefix : '');

    const onUpdate = () => {
        if (!isFormValid()) {
            return;
          }
        setLoading(true);
        configFileObject.prefix = prefix;
        setState({...state, configFile: JSON.stringify(configFileObject)});
        setNotification.success("Config file updated successfully.");
        props.onClose();
    }

    const isFormValid = () => {
        if (!prefix.trim().length) {
          setNotification.error("Please provide the prefix.");
        } else {
          return true;
        }
        return false;
    };

    const getAlertMessage = () => {
        if (!isUpdatable) {
            return 'Before proceeding to advanced settings, please ensure that you upload the configuration file.';
        }
        if (!prefix) {
            return "Kindly ensure that the uploaded configuration file contains the 'prefix' parameter within the object. If it's missing, please review and upload the file again.";
        }
    }

    return (
        <FormModal
            title='Update config file'
            yesLabel='Update'
            onClose={props.onClose}
            onConfirm={onUpdate}
            isYesButtonDisabled={!isUpdatable || isLoading}
            size='small'
        >
            <Box mt={2} mb={2} width={'100%'}>
                {(prefix && isUpdatable) ? 
                <Box>
                    <TextField label="Prefix" variant="outlined" value={prefix}
                    fullWidth placeholder='Please enter the prefix' size='small'
                    multiline maxRows={5} 
                    onChange={(event) => setPrefix(event.target.value)}/>
                </Box> : <Alert severity='info' fullWidth>{getAlertMessage()}</Alert>
                }
            </Box>
        </FormModal>
    );
};

export default ConfigFileSetting;