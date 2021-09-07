import { ReactElement, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
 
export interface FileUploadProps {
    onUpload: (stringifiedFile: Array<any>) => void;
}

const useStyles = makeStyles((theme) => ({
    inputFile: {
      display: 'none',
    },
    customFileUpload: {
      border: '1px solid #ccc',
      display: 'inline-block',
      padding: '6px 12px',
      cursor: 'pointer',
    }
  }));

export const FileUpload = ({onUpload}: FileUploadProps): ReactElement => { 
    const classes = useStyles();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.readAsText(event.target.files[0], "UTF-8");
        fileReader.onload = (e) => {
            onUpload(JSON.parse(fileReader.result as string))
        };
      };

    return (
        <>
        <label htmlFor="file-upload" className={classes.customFileUpload}>
          <CloudUploadIcon/> Custom Upload
        </label>
        <input id="file-upload" type="file" onChange={handleChange} className={classes.inputFile}/>
        </>
    );
  };