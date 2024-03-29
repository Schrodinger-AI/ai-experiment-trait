/**
 * 
 * App Routes
 * @author - NA 
 * @date - 13th March, 2024
 * 
 */
// GENERIC IMPORT
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {Box} from '@mui/material';

// ROUTER IMPORT
import * as PATH from './constants';

// COMMON PAGE IMPORT 
import Menu from '../pages/common/menu';
import Footer from '../pages/common/footer';
import NoPage from '../pages/error/noPage';

// PAGES 
import DashboardPage from '../pages/dashboard';
import ExperimentListPage from '../pages/experimentList';
import ExperimentSubmitterPage from '../pages/experimentSubmitter';
import ExperimentDetailsPage from '../pages/experimentDetails';
import ImageGeneratorPage from '../pages/imageGenerator';
import StaticFileImageGeneratorPage from '../pages/StaticFileImageGenerator';
import HelpPage from '../pages/help';
import Auth from '../pages/credential/auth';

// STYLE IMPORT
import useStyles from './styles';

const AppRoutes = () => {
    // STYLE DECLARE
    const classes = useStyles();
    
    // RENDER HTML
    return (
        <Box className={classes.app}>
            <Box className={classes.layout}>
                <Menu/>
                <Box className={classes.bodyContent}>
                    <Box className={classes.routerContainer}>
                        <Routes>
                            <Route path={PATH.HOME_PATH} element={<DashboardPage />}/>
                            <Route path={PATH.EXPERIMENT_SUBMITTER_PATH} element={<ExperimentSubmitterPage />}/>
                            <Route path={PATH.EXPERIMENT_LIST_PATH} element={<ExperimentListPage />}/>
                            <Route path={PATH.EXPERIMENT_DETAILS_PATH} element={<ExperimentDetailsPage />}/>
                            <Route path={PATH.IMAGE_GENERATOR_PATH} element={<ImageGeneratorPage />}/>
                            <Route path={PATH.STATIC_FILE_IMAGE_GENERATOR_PATH} element={<StaticFileImageGeneratorPage />}/>
                            <Route path={PATH.HELP_PATH} element={<HelpPage />}/>
                            <Route path="*" element={<NoPage />} />
                        </Routes>
                    </Box>
                    <Footer/>
                </Box>
            </Box>
            <Auth/>
        </Box>
    );
};

export default AppRoutes;