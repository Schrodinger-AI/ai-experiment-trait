/**
 * 
 * Submit experiment useHook component
 * @author - NA 
 * @date - 13th March, 2024
 * 
 */
// GENERIC IMPORT
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

// UTILS IMPORT
import useNotification from '../../../utils/notification';
import {generateRandomString, getTodayDateTime} from '../../../utils/file';
import {SUBMIT_STATUE} from '../../../utils/constants';
import {EXPERIMENT_SUBMIT_API} from '../../../api/constants';
import * as PATH from '../../routes/constants';

export function useHook(state, setState, fileRef, setLoading, selectedTraits) {

    // DECLARE NOTIFICATION AND NAVIDATE
    const setNotification = useNotification();

    // NAVBAR
    const navigate = useNavigate();

    const isFormValid = () => {
        if (!state.submitterName.trim().length) {
          setNotification.error("Please provide the name of the submitter.");
        } else if (!state.traitsFile) {
          setNotification.error("Please upload the trait definitions file in JSON format.");
        } else if (!state.createPromptFile) {
          setNotification.error("Please upload the 'createPrompt' file in JavaScript (.js) format.");
        } else if (!state.configFile) {
          setNotification.error("Please upload the configuration file in JSON format.");
        } else if (state.noOfSamples == 0) {
          setNotification.error("Please provide the number of samples.");
        } else {
          return true;
        }
        return false;
    };

    const resetForm = () => {
        setState({
        ...state,
        experimentId: generateRandomString(),
        submitterName: '',
        noOfSamples: 5,
        experimentDetails: '',
        traitsFile: null,
        createPromptFile: null,
        configFile: null,
        submittedDate: getTodayDateTime(),
        status: SUBMIT_STATUE.SUBMITTED
        });
        fileRef.traitFileRef.current.value = null;
        fileRef.createPromptFileRef.current.value = null;
        fileRef.configFileRef.current.value = null;
    }

    const filterTraitsList = (allowedTraits) => {
        const formattedTraitsObject = state?.traitsFile ? JSON.parse(state?.traitsFile) : {};
        if (allowedTraits.length > 0 && formattedTraitsObject) {
            for (let key in formattedTraitsObject) {
                if (!allowedTraits.includes(key)) {
                    delete formattedTraitsObject[key];
                }
            }
        }
        console.log(formattedTraitsObject);

        return JSON.stringify(formattedTraitsObject);
    }

    const submitForm = async () => {
        if (!isFormValid()) {
          return;
        }
        setLoading(true);
          try {
              const params = {
                ...state,
                traitsFile: filterTraitsList(selectedTraits),
                noOfSamples: parseInt(state.noOfSamples),
                submittedDate: getTodayDateTime()
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
              setNotification.success('Submission successful.');
              resetForm();
              navigate(PATH.EXPERIMENT_LIST_PATH);
          } catch (error) {
              console.log('error: ', error);
              setNotification.error("Something went wrong. Please try again later.");
          } finally {
              setLoading(false);
          }
    };

    const handleChange = (event, name) => {
        const { value, type, files } = event.target;
        if (type === 'file') {
            const file = files[0];
            const reader = new FileReader();
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if ((fileExtension === 'json' && ['configFile', 'traitsFile'].includes(name)) || (fileExtension === 'js' && ['createPromptFile'].includes(name))) {
              reader.onload = (e) => {
                if (fileExtension == 'json') {
                const jsonData = JSON.parse(e.target.result);
                const jsonString = JSON.stringify(jsonData);
                  setState(prevState => ({
                      ...prevState,
                      [name]: jsonString,
                  }));
                } else {
                  let finalContent = e.target.result;
                  setTimeout(() => setState(prevState => ({
                    ...prevState,
                    [name]: finalContent,
                  })), 0);
                }
              };
            reader.readAsText(file);
          } else {
             if (['configFile', 'traitsFile'].includes(name)) {
              setNotification.error('Please upload only JSON file');
            } else {
              setNotification.error('Please upload only Javascript file');
            }
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

    return {
        submitForm,
        resetForm,
        handleChange
    }
}