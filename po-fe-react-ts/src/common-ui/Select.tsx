import type { ReactElement } from 'react';
import { useState, ChangeEvent } from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export interface SelectProps {
    label: string;
    options: Option[];
    onChange: (value: string) => void;
}

interface Option {
    value: string;
    label: string;
}

const useStyles = makeStyles((theme) => ({
    container: {
        minWidth: '100%',
    },
  }));

export const Select = ({ label, options, onChange }: SelectProps): ReactElement => {  
    const classes = useStyles();
    const [selected, setSelected] = useState<string>('');

    const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
        setSelected(event.target.value as string);
        onChange(event.target.value as string);
    };

    return (
      <FormControl variant="outlined" className={classes.container}>
        <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
        <MuiSelect
          value={selected}
          onChange={handleChange}
          label={label}
          fullWidth={true}
        >
        {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
        ))}
        </MuiSelect>
      </FormControl>
    );
  };