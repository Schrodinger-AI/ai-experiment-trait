/**
 * 
 * Static File Image Generator experiment component
 * @author - NA 
 * @date - 20th March, 2024
 * 
 */
// GENERIC IMPORT
import React, { useState, useRef } from 'react';
import {Box, TextField, Button, Tooltip} from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

// COMMON COMPONENT
import {Container} from '../../atom';
import PageHeader from '../common/header/pageHeader';
import {EXPERIMENT_SUBMIT_API} from '../../../api/constants';
import {generateRandomString, getTodayDateTime} from '../../../utils/file';
import {SUBMIT_STATUE} from '../../../utils/constants';
import * as PATH from '../../routes/constants';

// FILE
import ConfigFileData from '../../../mockData/config.json';
import CreatePromptData from '../../../mockData/promptCreate.json';
import TraitsData from '../../../mockData/traits.json';

// UTILS IMPORT
import useNotification from '../../../utils/notification';

// STYLE IMPORT
import useStyles from './styles';

const StaticFileImageGeneratorPage = () => {
  // DECLARE STYLE
  const classes = useStyles();

  // NAVBAR
  const navigate = useNavigate();

  // REF VARIABLE
  const traitFileRef = useRef(null);

  // DECLARE NOTIFICATION AND NAVIDATE
  const setNotification = useNotification();

  // STATE VARIABLE
  const [isLoading, setLoading] = useState(false);
  const [state, setState] = useState({
    experimentId: generateRandomString(),
    submitterName: '',
    noOfSamples: 1,
    experimentDetails: '',
    traitsFile: null,
    createPromptFile: CreatePromptData,
    configFile: ConfigFileData.prefix,
    submittedDate: getTodayDateTime(),
    status: SUBMIT_STATUE.SUBMITTED,
    comments: [],
    minNumOfTraits: 3,
    maxNumOfTraits: 5,
  });

  const handleChange = (event, name) => {
    const { value, type, files } = event.target;
    if (type === 'file') {
        const file = files[0];
        const reader = new FileReader();
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (fileExtension === 'json' && ['traitsFile'].includes(name)) {
          reader.onload = (e) => {
            let finalContent = e.target.result;
            setTimeout(() => setState(prevState => ({
              ...prevState,
              [name]: finalContent,
            })), 0);
          };
        reader.readAsText(file);
      }  else {
        setNotification.error('Please upload only JSON file');
        setState(prevState => ({
          ...prevState,
          [name]: null,
        }));
        event.target.value = null;
     }
    }  else if (type === 'number') {
      setState(prevState => ({
          ...prevState,
          [name]: parseInt(value)
      }));
    } else {
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
  };

  const isAllFieldValid = () => {
    console.log("state.noOfSamples: ", state.noOfSamples);
    console.log("state.maxNumOfTraits: ", state.maxNumOfTraits);
    console.log("state.minNumOfTraits: ", state.minNumOfTraits);
    if (!state.submitterName.trim().length) {
      setNotification.error("Please provide the name of the submitter.");
    } else if (!state.configFile) {
      setNotification.error("Please provide the prefix.");
    } else if (!state.createPromptFile) {
      setNotification.error("Please provide the create prompt js content.");
    } else if (state.noOfSamples === 0) {
      setNotification.error("Please provide the number of samples.");
    } else if (!state.minNumOfTraits || state.minNumOfTraits === 0) {
      setNotification.error("Please provide the minimum No Of Traits.");
    } else if (!state.maxNumOfTraits || state.maxNumOfTraits === 0) {
      setNotification.error("Please provide the maximum No Of Traits.");
    } else {
      return true;
    }
    return false;
  };

  const submitForm = async () => {
    if (!isAllFieldValid()) {
      return;
    }
    setLoading(true);
      try {
        if (!state.traitsFile) {
          state.traitsFile = JSON.stringify(TraitsData);
        }
          const params = {
            ...state,
            configFile: JSON.stringify({...ConfigFileData, prefix: state.configFile}),
            submittedDate: getTodayDateTime(),
          }
          console.log("params: ", params);
          const response = await axios.post(
              EXPERIMENT_SUBMIT_API,
                  {
                      ...params,
                  },
                  {
                  headers: {
                      'Content-Type': 'application/json',
                  },
              }
          );
          console.log(response.data);
          resetForm();
          setTimeout(() => {
            setNotification.success('Submission successful.');
            setLoading(false)
            navigate(PATH.EXPERIMENT_LIST_PATH)
          }, 4000);
      } catch (error) {
          console.log('error: ', error);
          setNotification.error("Something went wrong. Please try again later.");
          setLoading(false);
      }
  };

  const resetForm = () => {
    setState({
      ...state,
      experimentId: generateRandomString(),
      submitterName: '',
      noOfSamples: 5,
      experimentDetails: '',
      traitsFile: null,
      createPromptFile: CreatePromptData,
      configFile: ConfigFileData.prefix,
      submittedDate: getTodayDateTime(),
      status: SUBMIT_STATUE.SUBMITTED,
      minNumOfTraits: 3,
      maxNumOfTraits: 5,
    });
    traitFileRef.current.value = null;
  }


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
          <TextField label="Config Prefix" variant="outlined" required 
            fullWidth={true} multiline maxRows={10}  value={state.configFile} className={classes.formTextfield} 
            type='text' onChange={(event) => handleChange(event, 'configFile')}/>
        </Box>
        <Box flex={1}>
          <TextField  label="Create Prompt" variant="outlined"  required 
            fullWidth={true} multiline maxRows={10}  value={state.createPromptFile} className={classes.formTextfield} 
            type='text' onChange={(event) => handleChange(event, 'createPromptFile')}/>
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
            helperText={<>Upload Trait definitioins file in json format. <Tooltip title="You can download and use it but its not latest file."><a href='/sampleFile/trait-definitioins.json' className={classes.link} download>Download</a></Tooltip> sample file.</>}/>
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
      <Box className={classes.btnContainer} textAlign='right' mt={4}>
          <Button variant="outlined" className={classes.btn} onClick={resetForm}>Clear</Button>
          <Button variant="contained" className={classes.btn} onClick={submitForm}>Submit Experiment</Button>
      </Box>
    </Container>
  );
};

export default StaticFileImageGeneratorPage;