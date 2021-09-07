import { localURL } from 'utils/url.util';
import { FormData } from 'components/SearchFieldsForm';
import { handleResponse } from 'services/ResponseHandler.service';

export const searchWithFilters = (filterValues: FormData) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filterValues),
    };

    return fetch(`${localURL}/search/search`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

export const getPorts = async () => {
    const requestOptions = {
        method: 'GET',
      };
    
    return fetch(`${localURL}/port/get-ports`, requestOptions).then(data => data.json())
}


