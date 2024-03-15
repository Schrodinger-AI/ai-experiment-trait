/**
 * 
 * Experiment Details component
 * @author - NA 
 * @date - 13th March, 2024
 * 
 */
// GENERIC IMPORT
import { useState, useEffect } from 'react';
import {Box, TextField, Button} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// COMMON COMPONENT
import {Container} from '../../atom';
import PageHeader from '../common/header/pageHeader';
import {getDate, shipStatus, experimentAlert} from '../../../utils/file';
import Comments from './components/comments';
import {FEATURE} from '../../../utils/feature';
import {GET_EXPERIMENT_BY_ID_API} from '../../../api/constants';
import Result from './components/result';

// UTILS IMPORT
import useNotification from '../../../utils/notification';

// MOCK DATA
import ExperimentList from './data/list.json';

// STYLE IMPORT
import useStyles from './styles';

const ExperimentDetailsPage = () => {
  // DECLARE STYLE
  const classes = useStyles();
  const { itemId } = useParams();

  // DECLARE NOTIFICATION AND NAVIDATE
  const setNotification = useNotification();

  // STATE VARIABLE
  const [isLoading, setLoading] = useState(false);
  const [state, setState] = useState({});

  const getExperimentDetailById = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`${GET_EXPERIMENT_BY_ID_API}${itemId}`);
        console.log(response.data);
        console.log(response.data?.[0] || {});
        let responseObject = response.data?.[0] || {};
        responseObject.result = responseObject?.result.sort((a, b) => new Date(b.create_date) - new Date(a.create_date));
        setState(responseObject);
    } catch (error) {
      console.log('error: ', error);
      setNotification.error("Something went wrong. Please try again later.");
    } finally {
        setLoading(false);
    }
  };

  const downloadJSONFile = (content, fileName) => {

    // Convert JSON object to string
    const jsonString = content;

    // Create a Blob containing the JSON data
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor element
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.json`; // File name
    link.click();

    // Revoke the temporary URL
    URL.revokeObjectURL(url);
  };

  const downloadJSFile = (content, fileName) => {
    // JavaScript content
    const jsContent = content;

    // Create a Blob containing the JavaScript data
    const blob = new Blob([jsContent], { type: 'text/javascript' });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor element
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.JS`; // File name
    link.click();

    // Revoke the temporary URL
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    getExperimentDetailById();
  }, []);
  return (
    <Container>
      <PageHeader title='Experiment Details' subtitle="Here's what you're looking at"  {...{isLoading}}></PageHeader>
      {state?.status && experimentAlert[state.status.toUpperCase()]}
      <Box className={classes.formRow} mt={5}>
        <Box className={classes.formField}>
          <Box className={classes.fieldLabel}>Experiment ID</Box>
          <Box className={classes.fieldValue}>{state.experimentId}</Box>
        </Box>
        <Box className={classes.formField}>
          <Box className={classes.fieldLabel}>Submitter Name</Box>
          <Box className={classes.fieldValue}>{state.submitterName}</Box>
        </Box>
      </Box>

      <Box className={classes.formRow}>
        <Box className={classes.formField}>
          <Box className={classes.fieldLabel}>Number of samples</Box>
          <Box className={classes.fieldValue}>{state.noOfSamples}</Box>
        </Box>
        <Box className={classes.formField}>
          <Box className={classes.fieldLabel}>Submitted date</Box>
          <Box className={classes.fieldValue}>{getDate(state.submittedDate)}</Box>
        </Box>
      </Box>

      <Box className={classes.formRow}>
        <Box className={classes.formField}>
          <Box className={classes.fieldLabel}>Status</Box>
          <Box className={classes.fieldValue}>{state?.status && shipStatus[state.status.toUpperCase()]}</Box>
        </Box>
        <Box className={classes.formField}>
          <Box className={classes.fieldLabel}>Experiment details</Box>
          <Box className={classes.fieldValue}>{state.experimentDetails}</Box>
        </Box>
      </Box>

      <Box className={classes.formRow}>
        <Box className={classes.formFieldlBlock}>
            <Box className={classes.fieldLabel}>Trait definitioins</Box>
            <TextField  variant="outlined" fullWidth={true} value={state.traitsFile} 
              multiline maxRows={10} className={classes.formTextfield} inputProps={{readOnly: true}}/>
          <Box className="btn-container" textAlign='right' mt={1}>
            <Button variant="contained" onClick={() => downloadJSONFile(state.traitsFile, 'traits')} disabled={!state.traitsFile}>Download</Button>
          </Box>
        </Box>
      </Box>
      
      <Box className={classes.formRow}>
        <Box className={classes.formFieldlBlock}>
            <Box className={classes.fieldLabel}>Create Prompt file</Box>
          <TextField  variant="outlined" fullWidth={true} value={state.createPromptFile} 
              multiline maxRows={10} className={classes.formTextfield} inputProps={{readOnly: true}}/>
            <Box className="btn-container" textAlign='right' mt={1}>
              <Button variant="contained" onClick={() => downloadJSFile(state.createPromptFile, 'createPrompt')} disabled={!state.createPromptFile}>Download</Button>
            </Box>
        </Box>
      </Box>
      <Box className={classes.formRow}>
        <Box className={classes.formFieldlBlock}>
            <Box className={classes.fieldLabel}>Config file</Box>
          <TextField variant="outlined" fullWidth={true} value={state.configFile} 
              multiline maxRows={10} className={classes.formTextfield} inputProps={{readOnly: true}}/>
          <Box className="btn-container" textAlign='right' mt={1}>
            <Button variant="contained" onClick={() => downloadJSONFile(state.configFile, 'config')} disabled={!state.configFile}>Download</Button>
          </Box>
        </Box>
      </Box>
      {state?.result?.length > 0 && <Result result={state.result}/>}
      {FEATURE.COMMENTS && <Comments experimentData={state}/>}
    </Container>
  );
};

export default ExperimentDetailsPage;