import { useEffect, useState } from "react";
import type { AIResponse } from "../types/AIResponse";
import { axiosInstance } from "../api/axios";
import type { AxiosResponse } from "axios";



export const useAIResponse = (eventId: number) => {
  const [analysis, setAnalysis] = useState<AIResponse>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAIEventsAnalysis = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const analysis: AxiosResponse<AIResponse> = await axiosInstance.get<AIResponse>(`/events/${eventId}/ai-analysis`);
        setAnalysis(analysis.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAIEventsAnalysis();
  }, []);

  return { analysis, loading, error };
};