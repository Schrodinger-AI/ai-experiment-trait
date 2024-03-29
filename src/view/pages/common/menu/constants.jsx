/**
 * 
 * Menu constants
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// ROUTER IMPORT
import React from 'react';
import * as PATH from '../../../routes/constants';
   
export const mainMenuItems = [
    {
        id: 'HOME',
        label: 'Home',
        icon: <i className="fa fa-th-large"></i>,
        link: PATH.HOME_PATH
    }
];

export const utilsMenuItems = [
    {
        id: 'EXPERIMENTSUBMITTER',
        label: 'Experiment Form',
        icon: <i className="fa fa-file-image-o"></i>,
        link: PATH.EXPERIMENT_SUBMITTER_PATH,
    },
    {
        id: 'EXPERIMENTLIST',
        label: 'Experiment List Generator',
        icon: <i className="fa fa-list-alt"></i>,
        link: PATH.EXPERIMENT_LIST_PATH,
    },
    {
        id: 'IMAGEGENERATOR',
        label: 'Image Generator',
        icon: <i className="fa fa-picture-o"></i>,
        link: PATH.IMAGE_GENERATOR_PATH,
    },
    {
        id: 'STATICFILEIMAGEGENERATOR',
        label: 'Static Image Generator',
        icon: <i className="fa fa-picture-o"></i>,
        link: PATH.STATIC_FILE_IMAGE_GENERATOR_PATH,
    },
];

export const settingsMenuItems = [
    {
        id: 'LOGOUT',
        label: 'Logout',
        icon: <i className="fa fa-power-off"></i>,
        link: PATH.LOGOUT_PATH,
    },
];

export const helpMenuItems = [
    {
        id: 'HELP',
        label: 'Help',
        icon: <i className="fa fa-question-circle"></i>,
        link: PATH.HELP_PATH,
    },
];