import { fetcher } from "@/shared/lib/axios";

const api = {
  audioStatistics: "/v1/audio/statistics",
};

class TotalService {
  getAudioStatistics({
    start_date,
    end_date,
  }: {
    start_date: string;
    end_date: string;
  }): Promise<any> {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    return fetcher.post(
      api.audioStatistics,
      { start_date, end_date },
      {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );
  }

}

export default new TotalService();
