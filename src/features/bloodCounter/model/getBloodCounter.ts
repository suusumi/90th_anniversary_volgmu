import {getData} from "../../../shared/api/dataLoader.ts";

export const getBloodCounter = () => {
    const data = getData();
    return data.stats.collected;
}