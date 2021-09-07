import type { ReactElement } from 'react';
import { ChangeEvent } from 'react';
import { FormControl, TextField } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
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

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 500,
    stringify: (option: PortOptionType) => option.label,
  });

interface PortOptionType {
    value: string;
    label: string;
}

export const Select = ({ label, options, onChange }: SelectProps): ReactElement => {  
    const classes = useStyles();

    const handleChange = (event: ChangeEvent<{}>, value: string | undefined) => {
      if(value){
        onChange(value);
      }
    };
    return (
      <FormControl variant="outlined" className={classes.container}>
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.label}
          onChange={(event, value) => handleChange(event, value?.label)}
          filterOptions={filterOptions}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Custom filter" variant="outlined" />}
        />
      </FormControl>


    );
  };