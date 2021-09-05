import type { ReactElement } from 'react';
import { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import { upload } from '../services/FileUpload.service'

export const UploadPage = (): ReactElement => {  

    const [files, setFiles] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
        return;
    }
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
        console.log("e.target.result", JSON.parse(fileReader.result as string));
        // setFiles(fileReader.result as string);
        upload(JSON.parse(fileReader.result as string))
    };
  };

    return (
        <>
        <Grid container justifyContent="center">
            <Button component={Link} to="/search" variant="contained" color="secondary" style={{float: 'right', top: 0}}>Go to search vessels</Button>
        </Grid>
        <div>
        <input type="file" onChange={handleChange} />
        </div>
        </>
    );
  };