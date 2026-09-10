import { axiosInstance } from "../axios";
import type { Event } from "../../types";
import type { AIResponse } from "../../types/AIResponse";


export const getEventById = async (id: number): Promise<Event> => {
    const response = await axiosInstance.get<Event>(`/events/${id}`);

    return(response.data);
};

