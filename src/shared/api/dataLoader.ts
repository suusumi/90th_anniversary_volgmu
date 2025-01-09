import data from './data.json';

export type Stats = {
    collected: number;
    remaining: number;
    daysLeft: number;
    donationCount: number;
};

export type Donor = {
    name: string;
    amount: number;
};

export const getData = () => data;