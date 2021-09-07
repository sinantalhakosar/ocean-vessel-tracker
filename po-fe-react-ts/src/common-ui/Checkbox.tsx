import type { ReactElement } from 'react';
import { FormControlLabel, Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps } from '@material-ui/core';

export interface CheckboxProps extends MuiCheckboxProps{
    label: string;
}

export const Checkbox = ({ label, checked, onChange }: CheckboxProps): ReactElement => { 
    
    return (
        <FormControlLabel
            control={
            <MuiCheckbox
                checked={checked}
                onChange={onChange}
                color="primary"
            />
            }
            label={label}
        />
    );
  };