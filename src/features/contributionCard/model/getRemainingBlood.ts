import { getData } from "../../../shared/api/dataLoader.ts";

export const getRemainingBlood = async () => {
    const data = await getData();
    return data.stats.remaining;
};