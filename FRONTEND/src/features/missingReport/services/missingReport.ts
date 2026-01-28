import { Upload } from "lucide-react";
import API from "../../../services/Api";
import { SearchMissingReportPayload } from "../type";


// Service to search missing report
const SearchMissingReportAPI = {
    upload: async (data: SearchMissingReportPayload) => {
        const formData = new FormData();
        //photo
        if(data.photo) {
            formData.append("photo", data.photo);
        }

        // basic info
        formData.append("approxAge", String(data.approxAge));
        if(data.notes) formData.append("notes", data.notes);

        // body features
        Object.entries(data.bodyFeatures).forEach(([key,value]) => {
            if(value) {
                formData.append(`bodyFeatures[${key}]`,value);
            }
        });
        // loation
        if(data.foundLocation?.coordinates) {
            formData.append("foundLocation[coordinates][0]", String(data.foundLocation.coordinates[0]));
            formData.append("foundLocation[coordinates][1]", String(data.foundLocation.coordinates[1]));
        }

        const response = await API.post(
            "/api/missing/search",
            formData, 
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;


    }
}

export default SearchMissingReportAPI;