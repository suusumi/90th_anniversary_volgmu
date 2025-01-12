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

export const getData = async () => {
    const response = await fetch('/data.json');
    if (!response.ok) {
        throw new Error(`Failed to load data.json: ${response.statusText}`);
    }
    return response.json();
};
