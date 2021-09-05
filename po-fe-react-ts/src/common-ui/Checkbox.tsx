import type { ReactElement } from 'react';
import { useState, ChangeEvent } from 'react';
import { FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';

export interface CheckboxProps {
    label: string;
}

export const Checkbox = ({ label }: CheckboxProps): ReactElement => { 
    
    const [state, setState] = useState({
        checkedB: true,
      });
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
    return (
        <FormControlLabel
            control={
            <MuiCheckbox
                checked={state.checkedB}
                onChange={handleChange}
                name="checkedB"
                color="primary"
            />
            }
            label={label}
        />
    );
  };