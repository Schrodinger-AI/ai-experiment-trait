/**
 * 
 * Loader component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import {Box} from '@mui/material';
import {Backdrop, CircularProgress} from '@mui/material';

const DarkLoader = () => {

    return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999, background: '#256dd3' }}
        open
    >
        <Box display='flex' flexDirection='column' alignItems='center' gap={1.5}>
            <CircularProgress color="inherit" />
            <Box>Verifying authentication...</Box>
        </Box>
    </Backdrop>)
};

export default DarkLoader;