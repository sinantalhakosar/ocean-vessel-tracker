import { ReactElement, ChangeEvent, useState } from 'react';
import { FormControlLabel, Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps } from '@material-ui/core';

export interface CheckboxProps extends Omit<MuiCheckboxProps, 'onChange'>{
    label: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({ label, checked, onChange }: CheckboxProps): ReactElement => { 
    const [value, setValue] = useState(checked);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.checked);
        onChange(event)
    }
    return (
        <FormControlLabel
            control={
            <MuiCheckbox
                checked={value}
                onChange={handleChange}
                color="primary"
            />
            }
            label={label}
        />
    );
  };