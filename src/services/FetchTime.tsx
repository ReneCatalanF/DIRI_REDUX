import { TimeData } from '../entites/entities';
import logger from "./logging";

const fetchData = async (
    timeZone: string,
    setTimeData: (data?: TimeData) => void,
    setLoading: (loading?: boolean) => void
): Promise<TimeData|undefined> => {
    setLoading(true);
    try {
        const response =
            await fetch(`https://timeapi.io/api/time/current/zone?timeZone=${timeZone}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data: TimeData = await response.json();
        //logger.debug("Dato recuperado de fecha: "+data.dateTime.toString());
        setTimeData(data);
        return (data)
    } catch (error) {
        console.error("Fetch error:", error);
        setTimeData(undefined);
    } finally {
        logger.debug("Finaliza");
        setLoading(false);
    }
};
export default fetchData;