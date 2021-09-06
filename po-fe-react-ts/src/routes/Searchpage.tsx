import { ReactElement, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchFieldsForm } from '../components/SearchFieldsForm';
import { MapContainer } from '../common-ui/MapContainer';
import { Grid, Button } from '@material-ui/core';
import { exampleData } from '../example';
import { searchWithFilters, getPorts } from '../services/Search.service'
import { FormData } from '../components/SearchFieldsForm';

export const SearchPage = (): ReactElement => {  
    const [ports, setPorts] = useState<Array<{UNLOCODE:string, Name: string}>>([]);
    const [vesselsData, setVesselsData] = useState<any>({});

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            getPorts().then(items => {
                if(mounted) {
                    setPorts(items.portsUnlocode)
                }
            });
          };
       
          fetchData();
      }, []);

      const handleSubmit = async (filterValues: FormData) => {
        const filteredVessels = await searchWithFilters(filterValues);
        setVesselsData(filteredVessels.data)
      }

    return (
        <>
        <Grid container justifyContent="center">
            <Button component={Link} to="/upload" variant="contained" color="secondary">Go to AIS JSON upload</Button>
        </Grid>
        <SearchFieldsForm onSubmit={handleSubmit} ports={ports}/>
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <MapContainer vesselsData={vesselsData}/>
            </Grid>
        </Grid>
        </>
    );
  };