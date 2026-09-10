import { useEffect, useState } from "react";
import type { AIResponse } from "../types/AIResponse";
import { axiosInstance } from "../api/axios";
import type { InterceptionEvent } from "../features/investigation-analysis/types/tableTypes";
import axios from "axios";



export function useAIResponse(
  event: InterceptionEvent,
  enabled: boolean
) {
  const [analysis, setAnalysis] = useState<AIResponse>({
    text: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Don't do anything while AI tab isn't selected
    if (!enabled) {
      return;
    }

    const controller = new AbortController();

    const fetchAnalysis = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await axiosInstance.post<AIResponse>(
          "/ai-analysis",
          event,
          {
            signal: controller.signal,
          }
        );

        // Don't update state if the request was cancelled
        if (!controller.signal.aborted) {
          setAnalysis(response.data);
        }
      } catch (err) {
        // Cancellation is not an actual error
        if (axios.isCancel(err) || controller.signal.aborted) {
          return;
        }

        setError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchAnalysis();

    // Runs when:
    // 1. User leaves the AI tab
    // 2. Card is unmounted/closed
    // 3. event changes
    return () => {
      controller.abort();
    };
  }, [event, enabled]);

  return { analysis, loading, error };
};