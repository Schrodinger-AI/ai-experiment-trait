/**
 * 
 * Traits File Setting component
 * @author - NA 
 * @date - 19th March, 2024
 * 
 */
// GENERIC IMPORT
import { useState } from 'react';
import {Box, FormControl, Alert, InputLabel, Select, MenuItem, Checkbox, FormGroup, FormControlLabel} from '@mui/material';

// UTILS IMPORT
import useNotification from '../../../../utils/notification';
import {capitalizeFirstLetter} from '../../../../utils/file';

// COMPONENT IMPORT
import {FormModal} from '../../../atom';

// STYLE IMPORT
import useStyles from '../styles';

const ConfigFileSetting = (props) => {
    // DECLARE STYLE
    const classes = useStyles();

    // DECLARE NOTIFICATION
    const setNotification = useNotification();

    // STATE VARIABLE
    const {state, setState} = props;
    const formTraitFile = state?.traitsFile ? JSON.parse(state?.traitsFile) : {};

    const formatTraitsObject = () => {
        const formattedTraitObject = props?.traitsFileObject  ? JSON.parse(props?.traitsFileObject) : {};
        for (const [key, value] of Object.entries(formattedTraitObject)) {
            const formattedValue = value.map(item => {
                return {isChecked: formTraitFile[key].includes(item), value: item}
            });
            formattedTraitObject[key] = formattedValue;
        }
        return formattedTraitObject;
    }

    // STATE VARIABLE
    const [selectedTraitType, setSelectedTraitType] = useState();
    const [isLoading, setLoading] = useState(false);
    const [traitObject, setTraitObject] = useState(formatTraitsObject());
    const [selectAll, setSelectAll] = useState(false);
    const traitTypeList = props?.traitsFileObject ? Object.keys(JSON.parse(props?.traitsFileObject)).sort() : [];
    const isUpdatable = !!props?.traitsFileObject;

    const getAlertMessage = () => {
        if (!isUpdatable) {
            return 'Before proceeding to advanced settings, please ensure that you upload the traits definition file.';
        }
        if (!traitTypeList) {
            return "Kindly ensure that the uploaded configuration file is in correct sample file template / structure. please review and upload the file again.";
        }
    }

    const updateTraitsObject = (value, isChecked) => {
        const updatedTraits = traitObject[selectedTraitType].map(item => {
            return {...item, isChecked: value == item.value ? isChecked : item.isChecked}
        });
        setTraitObject({...traitObject, [selectedTraitType]: updatedTraits});
    }

    const onUpdateTraitType = (event) => {
        setSelectedTraitType(event.target.value)
    };

    const onFormUpdate = () => {
        setLoading(true);
        for (const [key, value] of Object.entries(traitObject)) {
            const formattedValue = value.filter(item => item.isChecked).map(item => item.value);
            traitObject[key] = formattedValue;
        }
        setState({...state, traitsFile: JSON.stringify(traitObject)});
        setNotification.success("Traits definition file updated successfully.");
        props.onClose();
    }

    const onSelectAll = (isChecked) => {
        const formattedData = traitObject[selectedTraitType].map(item => {
            return {isChecked, value: item.value}
        });
        setTraitObject({...traitObject, [selectedTraitType]: formattedData});
        setSelectAll(isChecked)
    }

    return (
        <FormModal
            title='Update traits definition file'
            yesLabel='Update'
            onClose={props.onClose}
            onConfirm={onFormUpdate}
            isYesButtonDisabled={!isUpdatable || isLoading}
            size={(!isUpdatable || !traitTypeList) ? 'small' : 'large'}
        >
            <Box mt={2} mb={2}>
                {(traitTypeList && isUpdatable) ? 
                <Box>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Trait type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={onUpdateTraitType}
                            fullWidth
                        >
                            {traitTypeList.map((item) => (
                                <MenuItem value={item} key={item}>{capitalizeFirstLetter(item)}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {selectedTraitType && <Box ml={1} mt={2}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={selectAll} onChange={(event) => onSelectAll(event.target.checked)} />} label='Select all' />
                        </FormGroup>
                    </Box>}
                    <Box className={classes.contentScroll}>
                    
                    {selectedTraitType && traitObject?.[selectedTraitType].map((item, index) => (
                        <Box>
                            <FormGroup key={`${item.value}-${selectedTraitType}-${index}`}>
                                <FormControlLabel control={<Checkbox checked={item.isChecked} onChange={(event) => updateTraitsObject(item.value, event.target.checked)} />} label={item.value} />
                            </FormGroup>
                        </Box>
                    ))}
                    </Box>
                </Box> : <Alert severity='info' fullWidth>{getAlertMessage()}</Alert>
                }
            </Box>
        </FormModal>
    );
};

export default ConfigFileSetting;