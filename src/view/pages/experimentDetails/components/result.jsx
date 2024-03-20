/* eslint-disable react/prop-types */
/**
 * 
 * Result component
 * @author - NA 
 * @date - 15th March, 2024
 * 
 */
// GENERIC IMPORT
import clsx from 'clsx';
import React, { useState, useRef } from 'react';
import {Box, Chip} from '@mui/material';
import {Lightbox} from "react-modal-image";

// COMMON COMPONENT
import {CardImage} from '../../../molecules';

// STYLE IMPORT
import useStyles from '../styles';

const Result = (props) => {
    // DECLARE STYLE
    const classes = useStyles();

    // STATE VARIABLE
    const [imageModal, setImageModal] = useState({
      src: null,
      isOpen: false,
    });
  
    // REF VARIABLE
    const imageRef = useRef();
    
    // HANDLE IMAGE MODAL STATE
    const handleImageModal = (src) => {
        setImageModal({...imageModal, src, isOpen: true});
    }

    // HANDLE IMAGE MODAL CLOSE
    const onCloseModal = () => {
        setImageModal({src: null, isOpen: false});
    }

    return (
        <Box>
            <table  className={classes.dataTable}>
            <tr className={clsx(classes.dataList, classes.onlyDesktop)} >
                <td width={300} className={classes.dataListItem} >Sample image</td>
                <td className={classes.dataListItem} >Prompt</td>
                <td className={classes.dataListItem} >Revised prompt</td>
                <td className={classes.dataListItem} >Traits</td>
            </tr>
            {props?.result.map((item, index) => (
            <tr className={classes.dataList} key={`result-image-${index}`}>
                <td width={300} className={classes.dataListItem}>
                    <Box>
                        <CardImage file={
                        {
                            imageSrc: `data:image/webp;base64, ${item.imageResult}`,
                            handleImageModal: handleImageModal,
                            imageRef: imageRef,
                        }
                        }/>
                        <Box className={classes.title} textAlign={'center'} marginTop={0.5}><strong>Created date: </strong>{Date(item.create_date)}</Box>
                        <Box className={classes.onlyMobile}>
                            <Box className={classes.title} marginTop={0.5}><strong>Prompt:&nbsp;</strong>{item.prompt}&nbsp;<i className={clsx("fa fa-clone", classes.copyIcon)} onClick={() => navigator.clipboard.writeText(item.prompt)}></i></Box>
                            <Box className={classes.title} marginTop={1}><strong>Revised prompt:&nbsp;</strong>{item.revised_prompt}&nbsp;<i className={clsx("fa fa-clone", classes.copyIcon)} onClick={() => navigator.clipboard.writeText(item.revised_prompt)}></i></Box>
                            {item.traits && 
                            <Box>
                                <Box className={classes.title} marginTop={1}><strong>Traits: </strong>{JSON.stringify(item.traits)}&nbsp;</Box>
                                <Box display={'block'} mt={1}><Chip label={<><strong>Total traits:</strong> {item.traits.length}</>} size="small" variant="outlined" /></Box>
                            </Box>
                            }
                        </Box>
                    </Box>
                </td>
                <td className={clsx(classes.dataListItem, classes.onlyDesktop)}>
                    <Box className={classes.title} marginTop={0.5}>{item.prompt}&nbsp;<i className={clsx("fa fa-clone", classes.copyIcon)} onClick={() => navigator.clipboard.writeText(item.prompt)}></i></Box>
                </td>
                <td className={clsx(classes.dataListItem, classes.onlyDesktop)}>
                    <Box className={classes.title} marginTop={1}>{item.revised_prompt}&nbsp;<i className={clsx("fa fa-clone", classes.copyIcon)} onClick={() => navigator.clipboard.writeText(item.revised_prompt)}></i></Box>
                </td>
                <td className={clsx(classes.dataListItem, classes.onlyDesktop)}>
                    {item.traits && 
                        <Box>
                            <Box className={classes.title} marginTop={1}><strong>Traits: </strong>{JSON.stringify(item.traits)}&nbsp;</Box>
                            <Box display={'block'} mt={1}><Chip label={<><strong>Total traits:</strong> {item.traits.length}</>} size="small" variant="outlined" /></Box>
                        </Box>
                    }
                </td>
            </tr>
            ))}
            </table>
            {imageModal.isOpen && <Lightbox
                small={imageModal.src}
                large={imageModal.src}
                onClose={onCloseModal}
            />}
        </Box>
    );
};

export default Result;