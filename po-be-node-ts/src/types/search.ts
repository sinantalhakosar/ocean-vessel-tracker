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
    selectedPort: string;
    startDate: Date;
    endDate: Date;
    distance: number;
    showIdleVessels: boolean;
}