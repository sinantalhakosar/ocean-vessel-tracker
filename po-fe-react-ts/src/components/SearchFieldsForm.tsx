import type { ReactElement } from 'react';
import { TextField, Grid, Tooltip, Button } from '@material-ui/core';
import { Select } from '../common-ui/Select';
import { DateTimePicker } from '../common-ui/DateTimePicker';
import { Checkbox } from '../common-ui/Checkbox';
import { MapContainer } from '../common-ui/MapContainer';
import { makeStyles } from '@material-ui/core/styles';
import Help from '@material-ui/icons/Help';
import { exampleData } from '../example';
import clsx from 'clsx';

export interface SearchFieldsFormProps {
    // props
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

export const SearchFieldsForm = ({ }: SearchFieldsFormProps): ReactElement => {  
    const classes = useStyles();
    
    return (
    <div className={classes.container}>
    <form>
        <Grid container justifyContent="center" spacing={2} className={classes.mediumMarginBottom}>
        <Grid item xs={1}></Grid>
        <Grid item xs={2} className={classes.centerChildren}>
            <Select
                label='Port'
                options={[{value: 'AED', label: 'Emirates'}, {value: 'TR', label: 'Turkey'}]}
                onChange={() => {}}
            />
        </Grid>
        <Grid item xs={2} className={classes.centerChildren}>
            <DateTimePicker
                label="start date"
                onChange={() => {}}
            />
        </Grid>
        <Grid item xs={2} className={classes.centerChildren}>
            <DateTimePicker
                label="start date"
                onChange={() => {}}
            />
        </Grid>
        <Grid item xs={2} className={clsx(classes.centerChildren, classes.elementWithTooltipWrapper)}>
            <TextField id="outlined-basic" label="Distance" variant="outlined" />
            <Tooltip title="Distance in Km from the specified port" className={classes.smallMarginLeft}>
                <Help />
            </Tooltip>
        </Grid>
        <Grid xs={2} className={classes.centerChildren}>
            <Checkbox label="Include Idle Vessels"/>
        </Grid>
        <Grid item xs={1}></Grid>
        </Grid>
        <Grid container justifyContent="center">
            <Button variant="contained" color="primary">
                Search
            </Button>
        </Grid>
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <MapContainer data={exampleData}/>
            </Grid>
        </Grid>
        
      {/* <TextField label="Message"/>
      <Button type="submit">Submit</Button> */}
    </form>
    </div>
    );
  };