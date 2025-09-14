import { fetcher } from "@/shared/lib/axios";

const api = {
  predictRulesPaths: "/predict_distilled_paths",
  uploadCsv: "/upload",
  downloadFile: (filename: string) => `/download/${filename}`,
};

class TotalService {
  predictRulesPaths(data: any): Promise<any> {
    return fetcher.post(api.predictRulesPaths, data);
  }

  uploadCsv(file: File): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);

    return fetcher.post(api.uploadCsv, formData, {
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    });
  }

  downloadFile(filename: string): Promise<Blob> {
    return fetcher.get(api.downloadFile(filename), {
      responseType: "blob",
    });
  }
}

export default new TotalService();
