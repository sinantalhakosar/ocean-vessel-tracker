import type { ReactElement } from 'react';
import { useState, ChangeEvent } from 'react';
import { Grid, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export interface DateTimePickerProps {
    label: string;
    onChange: (date: Date | null) => void;
}

// textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 200,
//   },

export const DateTimePicker = ({ label, onChange }: DateTimePickerProps): ReactElement => {  
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(new Date(event.target.value));
        onChange(new Date(event.target.value));
    };

    return (
        <TextField
            id="datetime-local"
            label={label}
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            onChange={handleDateChange}
            //className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
      />
    );
  };