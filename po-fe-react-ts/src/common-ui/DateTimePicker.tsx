import type { ReactElement } from 'react';
import { ChangeEvent, useMemo } from 'react';
import { TextField } from '@material-ui/core';

export interface DateTimePickerProps {
    label: string;
    onChange: (date: Date | null) => void;
}

export const DateTimePicker = ({ label, onChange }: DateTimePickerProps): ReactElement => {  
    const todaysDate = new Date().toLocaleString().split(',')[0];

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedDate = new Date(event.target.value);
        onChange(selectedDate);
    };

    const todaysDefaultDate = useMemo(() => {
      var d = new Date(todaysDate);
      d.setHours(24,0,0,0);
      return d;
    }, [todaysDate]);

    return (
        <TextField
            id="datetime-local"
            label={label}
            type="datetime-local"
            defaultValue={todaysDefaultDate.toString()}
            onChange={handleDateChange}
            InputLabelProps={{
            shrink: true,
            }}
      />
    );
  };