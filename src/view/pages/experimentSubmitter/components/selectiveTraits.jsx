/**
 * 
 * Selective Traits component
 * @author - NA 
 * @date - 13th March, 2024
 * 
 */
// GENERIC IMPORT
import { useState } from 'react';
import {Box, Checkbox, FormControlLabel, Chip, Alert} from '@mui/material';

// STYLE IMPORT
import useStyles from '../styles';

const SelectiveTraits = (props) => {
    // DECLARE STYLE
    const classes = useStyles();

    // STATE VARIABLE
    const [isCheckTicked, setCheckTicked] = useState(false);

    const traitsTypeList = props?.traitsList ? Object.keys(JSON.parse(props.traitsList)) : [];

    const addTraits = (traitType) => {
        if (!isAlreadyAdded(traitType)) {
            props.setSelectedTraits((prevList => [...prevList, traitType]));
        }
    }

    const removeTraits = (traitType) => {
        const updatedList = props.selectedTraits.filter(item => item !== traitType);
        props.setSelectedTraits(updatedList);
    }

    const isAlreadyAdded = (traitType) => {
        return props.selectedTraits.some(item => item === traitType)
    }

    const handleCheckbox = (event) => {
        setCheckTicked(event.target.checked);
        if (!event.target.checked) {
            props.setSelectedTraits([]);
        }
    }

    return (
        <Box>
            <Box className={classes.groupCheckbox}>
                <FormControlLabel control={<Checkbox disabled={!props?.traitsList} onChange={handleCheckbox} checked={isCheckTicked}/>} label="Selective traits" />
                {isCheckTicked && <Box>Total selected traits: {props.selectedTraits.length}</Box>}
            </Box>
            <Alert color="warning">To enable selective traits, begin by uploading the 'traits definition file'. Then, select 'Selective traits' checkbox, and choose the desired traits type from the options below. Only the selected traits type will be included in generating the image.</Alert>
            {isCheckTicked && 
                <Box>{traitsTypeList.map((traitType, index) => (
                    <Chip color="primary" onClick={() => addTraits(traitType)} label={traitType} 
                        variant={isAlreadyAdded(traitType) ? 'filled' : "outlined"} className={classes.chipItem} key={`${traitType}-${index}`} 
                        {...(isAlreadyAdded(traitType) && { onDelete: () => removeTraits(traitType)})} />
                ))}
                </Box>
            }
        </Box>
    );
};

export default SelectiveTraits;