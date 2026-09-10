// src/hooks/useEvents.ts
import { useState, useEffect } from 'react';
import { axiosInstance } from '../api/axios'; 
import type { Event } from '../types';              

export interface FilterEventsDto {
  region?: string[];
  type?: string[];
  launchRegion?: string[];
  status?: string[];
}

export const useEvents = (filters: FilterEventsDto = {}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axiosInstance.post<Event[]>('/events/all-events', filters);
        setEvents(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [JSON.stringify(filters)]);

  return { events, loading, error };
};