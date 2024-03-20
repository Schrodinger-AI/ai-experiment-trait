/**
 * 
 * Traits experiment component
 * @author - NA 
 * @date - 13th March, 2024
 * 
 */
// GENERIC IMPORT
import React, { useState, useRef } from 'react';
import {Box, TextField, Button, Tooltip} from '@mui/material';

// COMMON COMPONENT
import {Container} from '../../atom';
import PageHeader from '../common/header/pageHeader';
import {generateRandomString, getTodayDateTime} from '../../../utils/file';
import {SUBMIT_STATUE} from '../../../utils/constants';

// INTERNAL COMPONENT
import SelectiveTraits from './components/selectiveTraits';
import ConfigFileSetting from './components/configFileSetting';
import TraitsFileSetting from './components/traitsFileSetting';

// HOOK
import {useHook} from './useHook';

// STYLE IMPORT
import useStyles from './styles';

const ExperimentSubmitterPage = () => {
  // DECLARE STYLE
  const classes = useStyles();

  // REF VARIABLE
  const traitFileRef = useRef(null);
  const createPromptFileRef = useRef(null);
  const configFileRef = useRef(null);

  // STATE VARIABLE
  const [isLoading, setLoading] = useState(false);
  const [isOpenConfigFileModal, setOpenConfigFileModal] = useState(false);
  const [isOpenTraitsFileModal, setOpenTraitsFileModal] = useState(false);
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [defaultFile, setDefaultFile] = useState({
    traitsFile: null,
    configFile: null,
  });
  const [state, setState] = useState({
    experimentId: generateRandomString(),
    submitterName: '',
    noOfSamples: 5,
    experimentDetails: '',
    traitsFile: null,
    createPromptFile: null,
    configFile: null,
    submittedDate: getTodayDateTime(),
    status: SUBMIT_STATUE.SUBMITTED,
    comments: [],
    minNumOfTraits: 3,
    maxNumOfTraits: 5,
  });

  // HOOK VARIABLE
  const {submitForm, resetForm, handleChange} = useHook(
    state, 
    setState, 
    {traitFileRef, createPromptFileRef, configFileRef},
    setLoading,
    selectedTraits,
    setDefaultFile,
  );

  return (
    <Container>
      <PageHeader title='Experiment Submitter' subtitle="Here's what you're looking at"  {...{isLoading}}></PageHeader>
      <Box className={classes.formRow}>
        <Box flex={1}>
          <TextField  label="Experiment ID" variant="outlined" required 
            fullWidth={true} value={state.experimentId} className={classes.formTextfield}  disabled
            type='text'/>
        </Box>
        <Box flex={1}>
          <TextField  label="Submitter Name" variant="outlined"  required 
            fullWidth={true} value={state.submitterName} className={classes.formTextfield} 
            type='text' onChange={(event) => handleChange(event, 'submitterName')} inputProps={{maxLength: 25}}/>
        </Box>
      </Box>
      <Box className={classes.formRow}>
        <Box flex={1}>
          <TextField 
            accept="image/*" 
            required
            type="file" 
            variant="outlined" 
            className={classes.formTextfield}
            onChange={(event) => handleChange(event, 'traitsFile')}
            fullWidth={true}
            inputProps={{
              ref: traitFileRef
            }}
            helperText={<>Upload Trait definitioins file in json format. <Tooltip title="You can download and use it but its not latest file."><a href='/sampleFile/trait-definitioins.json' className={classes.link} download>Download</a></Tooltip> sample file. <Tooltip title="You can add / remove the traits item."><Box className={classes.link}  onClick={() => setOpenTraitsFileModal(true)}>Advance setting</Box></Tooltip>.</>}/>
        </Box>
        <Box flex={1}>
          <TextField 
              accept="image/*" 
              type="file" 
              variant="outlined" 
              className={classes.formTextfield}
              onChange={(event) => handleChange(event, 'createPromptFile')}
              fullWidth={true}
              required
              inputProps={{
                ref: createPromptFileRef
              }}
              helperText={<>Upload createPrompt file in js format. <Tooltip title="You can download and use it but its not latest file."><a href='/sampleFile/createPrompt.js' className={classes.link} download>Download</a></Tooltip> sample file.</>}/>
        </Box>
      </Box>
      <Box className={classes.formRow}>
        <Box flex={1}>
        <TextField 
            accept="image/*" 
            type="file" 
            variant="outlined" 
            className={classes.formTextfield}
            onChange={(event) => handleChange(event, 'configFile')}
            fullWidth={true}
            required
            inputProps={{
              ref: configFileRef
            }}
            helperText={<>Upload config file in json format. <Tooltip title="You can download and use it but its not latest file."><a href='/sampleFile/config.json' className={classes.link} download>Download</a></Tooltip> sample file. <Tooltip title="You can change the prefix message."><Box className={classes.link}  onClick={() => setOpenConfigFileModal(true)}>Advance setting</Box></Tooltip>.</>}/>
        </Box>
        <Box flex={1}>
          <TextField  label="Number of samples" variant="outlined" required 
            fullWidth={true} value={state.noOfSamples} className={classes.formTextfield} 
            type='number' 
            onChange={(event) => handleChange(event, 'noOfSamples')} inputProps={{min: "1", max: "1000"}}/>
        </Box>
      </Box>
      <Box className={classes.formRow}>
        <Box flex={1}>
          <TextField  label="Mininum No Of Traits" variant="outlined" required 
            fullWidth={true} value={state.minNumOfTraits} className={classes.formTextfield} 
            type='number' onChange={(event) => handleChange(event, 'minNumOfTraits')} inputProps={{min: 1, max: 25}}/>
        </Box>
        <Box flex={1}>
          <TextField  label="Maximum No Of Traits" variant="outlined"  required 
            fullWidth={true}  value={state.maxNumOfTraits} className={classes.formTextfield} 
            type='number' onChange={(event) => handleChange(event, 'maxNumOfTraits')} inputProps={{min: 1, max: 25}}/>
        </Box>
      </Box>
      <Box className={classes.formRow}>
        <Box flex={1}>
          <TextField  label="Experiment details" variant="outlined" fullWidth={true} value={state.experimentDetails} 
            multiline maxRows={5} className={classes.formTextfield} 
            onChange={(event) => handleChange(event, 'experimentDetails')} inputProps={{maxLength: 400}}/>
        </Box>
      </Box>
      <SelectiveTraits traitsList={state.traitsFile} {...{selectedTraits, setSelectedTraits}}/>
      {isOpenConfigFileModal && <ConfigFileSetting configFileObject={state.configFile} {...{state, setState}} onClose={() => setOpenConfigFileModal(false)}/>}
      {isOpenTraitsFileModal && <TraitsFileSetting traitsFileObject={defaultFile.traitsFile} {...{state, setState}} onClose={() => setOpenTraitsFileModal(false)}/>}
      <Box className={classes.btnContainer} textAlign='right' mt={2}>
          <Button variant="outlined" onClick={resetForm}>Clear</Button>
          <Button variant="contained" onClick={submitForm}>Submit Experiment</Button>
      </Box>
    </Container>
  );
};

export default ExperimentSubmitterPage;