import { axiosInstance } from "../../../../api/axios";

export const useExportStatistics = () => {
  const exportStatistics = async (
    path: string,
  ): Promise<Blob> => {
    try {
      const response = await axiosInstance.get<Blob>("report/pdf", {
        params: {
          path,
        },
        responseType: "blob",
      });

      if (response.status !== 200) {
        throw new Error("Failed to export statistics");
      }

      return response.data;
    } catch (error) {
      throw new Error("Failed to export statistics");
    }
  };

  return {
    exportStatistics,
  };
};