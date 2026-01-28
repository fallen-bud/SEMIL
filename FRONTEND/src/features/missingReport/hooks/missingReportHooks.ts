import { useState } from "react";
import SearchMissingReportAPI from "../services/missingReport";
import { SearchMissingReportPayload } from "../type";


// return type interface 
interface UseSearchMissingReportReturn {
    submitSearch: (data: SearchMissingReportPayload) => Promise<void>;
    loading: boolean;
    error: string | null;
    result: any; // later define proper type
}

const useSearchMissingReport = (): UseSearchMissingReportReturn => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<any>(null);

    const submitSearch = async (data: SearchMissingReportPayload) => {
        setLoading(true);
        setError(null);
        try {
            const response = await SearchMissingReportAPI.upload(data);
            setResult(response);
        } catch (err) {
            setError("Failed to submit search");
        } finally {
            setLoading(false);
        }
    };

    return { submitSearch, loading, error, result };
}

export default useSearchMissingReport;

