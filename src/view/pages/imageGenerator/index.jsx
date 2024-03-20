/**
 * 
 * Image Generator experiment component
 * @author - NA 
 * @date - 13th March, 2024
 * 
 */
// GENERIC IMPORT
import React, { useState } from 'react';
import {Box, TextField, Button, Chip} from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

// COMMON COMPONENT
import {Container} from '../../atom';
import PageHeader from '../common/header/pageHeader';
import {EXPERIMENT_SUBMIT_API} from '../../../api/constants';
import {generateRandomString, getTodayDateTime} from '../../../utils/file';
import {SUBMIT_STATUE} from '../../../utils/constants';
import * as PATH from '../../routes/constants';
import TraitsModal from './components/traitsModal';

// FILE
import ConfigFileData from '../../../mockData/config.json';
import CreatePromptData from '../../../mockData/promptCreate.json';

// UTILS IMPORT
import useNotification from '../../../utils/notification';

// STYLE IMPORT
import useStyles from './styles';

const ImageGeneratorPage = () => {
  // DECLARE STYLE
  const classes = useStyles();

  // NAVBAR
  const navigate = useNavigate();

  // DECLARE NOTIFICATION AND NAVIDATE
  const setNotification = useNotification();

  // REF VARIABLE
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [isOpenModal, setOpenModal] = useState(false);

  // STATE VARIABLE
  const [isLoading, setLoading] = useState(false);
  const [state, setState] = useState({
    experimentId: generateRandomString(),
    submitterName: '',
    noOfSamples: 1,
    experimentDetails: '',
    traitsFile: null,
    createPromptFile: CreatePromptData,
    configFile: JSON.stringify(ConfigFileData),
    submittedDate: getTodayDateTime(),
    status: SUBMIT_STATUE.SUBMITTED,
    comments: []
  });

  const handleChange = (event, name) => {
    const { value, type, files } = event.target;
    if (type === 'file') {
        const file = files[0];
        const reader = new FileReader();
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if ((fileExtension === 'js' && ['createPromptFile'].includes(name))) {
          reader.onload = (e) => {
            let finalContent = e.target.result;
            setTimeout(() => setState(prevState => ({
              ...prevState,
              [name]: finalContent,
            })), 0);
          };
        reader.readAsText(file);
      } else { 
        setNotification.error('Please upload only Javascript file');
        setState(prevState => ({
          ...prevState,
          [name]: null,
        }));
        event.target.value = null;
      }
    } else {
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
  };

  const openModal = () => {
    setOpenModal(true);
  }

  const closeModal = () => {
    setOpenModal(false);
  }

  const isAllFieldValid = () => {
    if (!state.submitterName.trim().length) {
      setNotification.error("Please provide the name of the submitter.");
    } else if (!selectedTraits || selectedTraits.length < 4) {
      setNotification.error("Please select atleast 4 traits.");
    } else if (state.noOfSamples === 0) {
      setNotification.error("Please provide the number of samples.");
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
          const traitsFileContent = JSON.stringify(selectedTraits.reduce((acc, curr) => {
            acc[curr.traitType] = [curr.value];
            return acc;
          }, {}));
          const params = {
            ...state,
            noOfSamples: 1,
            submittedDate: getTodayDateTime(),
            traitsFile: traitsFileContent
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
      configFile: JSON.stringify(ConfigFileData),
      submittedDate: getTodayDateTime(),
      status: SUBMIT_STATUE.SUBMITTED
    });
    setSelectedTraits([]);
  }

  const removeTraits = (value, traitType) => {
    const updatedList = selectedTraits.filter(item => !(item.value === value && item.traitType === traitType));
    setSelectedTraits(updatedList);
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
          <TextField  label="Experiment details" variant="outlined" fullWidth={true} value={state.experimentDetails} 
            multiline maxRows={5} className={classes.formTextfield} 
            onChange={(event) => handleChange(event, 'experimentDetails')} inputProps={{maxLength: 400}}/>
        </Box>
      </Box>
      {selectedTraits.map((item) => <Chip color="primary" onDelete={() => removeTraits(item.value, item.traitType)} label={`${item.traitType}: ${item.value}`} className={classes.chipItem} key={`${item.value}-selected-traits`} />)}
      <Box mt={2}/>
      {isOpenModal && <TraitsModal selectedTraits={selectedTraits} setSelectedTraits={setSelectedTraits} onClose={closeModal}/>}

      <Box className={classes.btnContainer} textAlign='right' mt={4}>
          <Button variant="outlined" onClick={openModal}>Select Traits</Button>
          <Button variant="outlined" onClick={resetForm}>Clear</Button>
          <Button variant="contained" onClick={submitForm}>Submit Experiment</Button>
      </Box>
    </Container>
  );
};

export default ImageGeneratorPage;