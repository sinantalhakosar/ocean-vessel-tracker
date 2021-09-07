import { ReactElement, useState } from 'react';
import { ChangeEvent } from 'react';
import { TextField, Grid, Tooltip, Button } from '@material-ui/core';
import { Select } from '../common-ui/Select';
import { DateTimePicker } from '../common-ui/DateTimePicker';
import { Checkbox } from '../common-ui/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Help from '@material-ui/icons/Help';
import clsx from 'clsx';

export interface SearchFieldsFormProps {
    ports: Array<{UNLOCODE:string, Name: string}>;
    onSubmit: (formValues: FormData) => void;
}

export interface FormData {
    selectedPort: string;
    startDate:Date | null;
    endDate:Date | null;
    distance:number | null;
    showIdleVessels: boolean;
}

const useStyles = makeStyles((theme) => ({
    container: {
      width: '100%',
    },
    centerChildren: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    smallMarginLeft: {
        marginLeft: '8px'
    },
    mediumMarginBottom: {
        marginBottom: '16px'
    },
    elementWithTooltipWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    }
  }));

  const initialFormValues: FormData = {
    selectedPort: '',
    startDate: null,
    endDate: null,
    distance: null,
    showIdleVessels: false
  }

  const useFormControls = () => {
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({} as any);
    const validate: any = (fieldValues = values) => {
        let temp: any = { ...errors }

        if ("selectedPort" in fieldValues){
          temp.selectedPort = fieldValues.selectedPort ? "" : "This field is required."
        }
    
        if ("startDate" in fieldValues){
          temp.startDate = fieldValues.startDate ? "" : "This field is required."
        }

        if ("endDate" in fieldValues){
            temp.endDate = fieldValues.endDate ? "" : "This field is required."
        }

        if ("distance" in fieldValues){
            temp.distance = fieldValues.distance ? "" : "This field is required."
        }
    
        setErrors({
          ...temp
        });
    }
    const handlePortChange = (value: string) => {
        setValues({
            ...values,
            selectedPort: value
        });
        validate({ selectedPort: value });
    }

    const handleStartDateChange = (date: Date | null) => {
        setValues({
            ...values,
            startDate: date
        });
        validate({ startDate: date });
    }

    const handleEndDateChange = (date: Date | null) => {
        setValues({
            ...values,
            endDate: date
        });
        validate({ endDate: date });
    }

    const handleDistanceChange = (event:ChangeEvent<HTMLInputElement>) => {
        var distance: number = +event.target.value;
        setValues({
            ...values,
            distance: distance
        });
        validate({ distance: distance });
    }

    const handleShowOnlyIdleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            showIdleVessels: event.target.checked
        });
    }
    const handleFormSubmit = async (e: any, onSubmitFunc: (formValues: FormData) => void) => {
        e.preventDefault();
        if (formIsValid()) {
          //await postContactForm(values);
          onSubmitFunc(values)
          alert("You've posted your form!")
        }
    };
    const formIsValid = (fieldValues = values) => {
        const isValid =
        fieldValues.selectedPort &&
        fieldValues.startDate &&
        fieldValues.endDate &&
        fieldValues.distance &&
        Object.values(errors).every((x) => x === "");
  
      return isValid;
    }
   return {
        handlePortChange,
        handleStartDateChange,
        handleEndDateChange,
        handleDistanceChange,
        handleShowOnlyIdleCheck,
        handleFormSubmit,
        formIsValid
    };
  }

export const SearchFieldsForm = ({ ports, onSubmit }: SearchFieldsFormProps): ReactElement => {  
    const classes = useStyles();

    const {
        handlePortChange,
        handleStartDateChange,
        handleEndDateChange,
        handleDistanceChange,
        handleShowOnlyIdleCheck,
        handleFormSubmit,
        formIsValid
      } = useFormControls();

    return (
    <div className={classes.container}>
    <form onSubmit={(event) => handleFormSubmit(event, onSubmit)}>
        <Grid container justifyContent="center" spacing={2} className={classes.mediumMarginBottom}>
        <Grid item xs={1}></Grid>
        <Grid item xs={2} className={classes.centerChildren}>
            <Select
                label='Port'
                options={ports.map((port, index) => {
                    return {value: port.UNLOCODE, label: `${port.UNLOCODE} ${port.Name}`}
                })}
                onChange={(value) => handlePortChange(value)}
            />
        </Grid>
        <Grid item xs={2} className={classes.centerChildren}>
            <DateTimePicker
                label="start date"
                onChange={handleStartDateChange}
            />
        </Grid>
        <Grid item xs={2} className={classes.centerChildren}>
            <DateTimePicker
                label="end date"
                onChange={handleEndDateChange}
            />
        </Grid>
        <Grid item xs={2} className={clsx(classes.centerChildren, classes.elementWithTooltipWrapper)}>
            <TextField id="outlined-basic" label="Distance" variant="outlined" onChange={handleDistanceChange}/>
            <Tooltip title="Distance in Km from the specified port" className={classes.smallMarginLeft}>
                <Help />
            </Tooltip>
        </Grid>
        <Grid xs={2} className={classes.centerChildren}>
            <Checkbox label="Include Idle Vessels" checked={initialFormValues.showIdleVessels} onChange={handleShowOnlyIdleCheck}/>
        </Grid>
        <Grid item xs={1}></Grid>
        </Grid>
        <Grid container justifyContent="center">
            <Button variant="contained" color="primary" type="submit" disabled={!formIsValid()}>
                Search
            </Button>
        </Grid>
    </form>
    </div>
    );
  };