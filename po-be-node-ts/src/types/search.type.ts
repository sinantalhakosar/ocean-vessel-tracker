export interface ISearch {
    TIME: Date;
    LONGITUDE: number;
    LATITUDE: number;
    IMO: string;
    NAME: string;
    TYPE: number;
    DEST: string;
    ETA: Date;
    SOG: number;
}

export interface IFilter {
    country: string;
    location: string;
    startDate: string;
    endDate: string;
    distance: number;
    showIdleVessels: boolean;
}