import { getData } from "../../../shared/api/dataLoader.ts";

export const getDonationCount = async () => {
    const data = await getData();
    return data.donors;
};