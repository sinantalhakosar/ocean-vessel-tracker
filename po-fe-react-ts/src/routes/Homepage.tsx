import type { ReactElement } from 'react';
import { SearchFieldsForm } from '../components/SearchFieldsForm';
import { MapContainer } from '../common-ui/MapContainer';
import { Grid } from '@material-ui/core';
import { exampleData } from '../example';

export interface HomepageProps {
    // props
}

export const Homepage = ({ }: HomepageProps): ReactElement => {  
    return (
        <>
        <SearchFieldsForm/>
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <MapContainer data={exampleData}/>
            </Grid>
        </Grid>
        </>
    );
  };