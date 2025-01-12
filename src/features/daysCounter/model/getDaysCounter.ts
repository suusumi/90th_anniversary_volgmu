import {getData} from "../../../shared/api/dataLoader.ts";

export const getDaysCounter = async () => {
    const data = await getData();
    return data.stats.daysLeft;
}