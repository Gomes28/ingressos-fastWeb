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
        street: string;
        city: string;
        state: string;
    }
    tickets: ITicket[];
}

export interface ITicket {
    id: string,
    name: string,
    buy_Initial: string,
    buy_Final: string,
    price: number,
    quantity?: number
}