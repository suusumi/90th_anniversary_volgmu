import { getData } from "../../../shared/api/dataLoader.ts";

export const getBloodCounter = async () => {
    const data = await getData();
    return data.stats.collected;
};
