import {getData} from "../../../shared/api/dataLoader.ts";

export const getDaysCounter = () => {
    const data = getData();
    return data.stats.daysLeft;
}