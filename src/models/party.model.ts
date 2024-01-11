export interface IParty {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_initial: {
        date: string;
        timezone_type: number;
        timezone: string;
    };
    date_final: {
        date: string;
        timezone_type: number;
        timezone: string;
    };
    classified: string;
    time_initial: string;
    time_final: string;
    slugger: string;
    address: {
        name: string;
        city: string;
        state: string;
    }
}