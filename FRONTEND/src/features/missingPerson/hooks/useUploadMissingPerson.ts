import { useState } from "react";
import UploadMissingPersonAPI from "../services/uploadMissing";
import { UploadMissingPersonPayload } from "../type";

/* =====================================
   TYPES
===================================== */

interface UploadResult {
  success: boolean;
  data?: any;
  error?: string;
}

/* =====================================
   HOOK
===================================== */

const useUploadMissingPerson = () => {
  /* -----------------------------
     STATE
  ----------------------------- */

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /* -----------------------------
     ACTION
  ----------------------------- */

  const uploadMissingPerson = async (
    data: UploadMissingPersonPayload
  ): Promise<UploadResult> => {
    try {
      setLoading(true);
      setError(null);

      const response = await UploadMissingPersonAPI.upload(data);

      return {
        success: true,
        data: response,
      };
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        "Failed to upload missing person report";

      setError(message);

      return {
        success: false,
        error: message,
      };
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------
     EXPOSE
  ----------------------------- */

  return {
    uploadMissingPerson,
    loading,
    error,
  };
};

export default useUploadMissingPerson;
