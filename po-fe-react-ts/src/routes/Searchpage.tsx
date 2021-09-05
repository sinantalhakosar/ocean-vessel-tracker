import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { SearchFieldsForm } from '../components/SearchFieldsForm';
import { MapContainer } from '../common-ui/MapContainer';
import { Grid, Button } from '@material-ui/core';
import { exampleData } from '../example';
import { searchWithFilters } from '../services/Search.service'

export const SearchPage = (): ReactElement => {  
    return (
        <>
        <Grid container justifyContent="center">
            <Button component={Link} to="/upload" variant="contained" color="secondary">Go to AIS JSON upload</Button>
        </Grid>
        <SearchFieldsForm onSubmit={searchWithFilters}/>
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <MapContainer data={exampleData}/>
            </Grid>
        </Grid>
        </>
    );
  };