import { localURL } from 'utils/url.util';
import { handleResponse } from 'services/ResponseHandler.service';

/**
 * While uploading the data, below fields are unnecessary for this project, so I decided to remove them
 */
export const upload = (stringifiedFile: Array<any>) => {
    stringifiedFile.forEach((el) => {
        delete el.MMSI;
        delete el.COG;
        delete el.A;
        delete el.B;
        delete el.C;
        delete el.D;
        delete el.HEADING;
        delete el.NAVSTAT;
        delete el.ROT;
        delete el.DRAUGHT;
        delete el.CALLSIGN;
    });

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stringifiedFile),
    };

    return fetch(`${localURL}/search/upload`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}
