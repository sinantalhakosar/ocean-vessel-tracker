import { localURL } from '../utils/url.util';
import { FormData } from '../components/SearchFieldsForm';

export const searchWithFilters = (filterValues: FormData) => {
    console.log(filterValues)
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


export const handleResponse = (response: any) => {
    return response.text().then((text: any) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}