export type Statistics = {
    investigations: number;
    completed: number;
    pending: number;
  };
  
  export const useExportStatistics = () => {
    const exportStatistics = async (
      statistics: Statistics,
    ): Promise<Blob> => {
      // TODO: Replace with the real API request
      console.log("Statistics sent to server:", statistics);
  
      // Temporary stub
      await new Promise((resolve) => setTimeout(resolve, 500));
  
      // Temporary fake PDF response
      return new Blob(
        ["PDF generation is not available yet."],
        { type: "application/pdf" },
      );
    };
  
    return {
      exportStatistics,
    };
  };

  /*
  should look like something like this

  const exportStatistics = async (statistics: Statistics) => {
  const response = await fetch("/api/statistics/export", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(statistics),
  });

  if (!response.ok) {
    throw new Error("Failed to export statistics");
  }

  return response.json();
};
  */