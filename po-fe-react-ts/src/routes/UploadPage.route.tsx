import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Box } from '@material-ui/core';
import { upload } from '../services/FileUpload.service';
import { FileUpload } from '../components/FileUpload';

const Spacer = () => <Box display="inline" mr={4} />;

export const UploadPage = (): ReactElement => {  

    return (
        <>
        <Grid container justifyContent="center">
            <Button component={Link} to="/search" variant="contained" color="secondary" style={{float: 'right', top: 0}}>Go to search vessels</Button>
        </Grid>
        <Spacer/>
        <Grid container justifyContent="center">
          <FileUpload onUpload={upload}/>
        </Grid>
        </>
    );
  };