import API from "../../../services/Api";
import { UploadMissingPersonPayload } from "../type";

/* ======================================
   Upload Missing Person (Family)
====================================== */

const UploadMissingPersonAPI = {
  upload: async (data: UploadMissingPersonPayload) => {
    const formData = new FormData();

    /* -------- PHOTO -------- */
    if (data.photo) {
      formData.append("photo", data.photo);
    }

    /* -------- BASIC INFO -------- */
    formData.append("name", data.name);
    if (data.age !== "") {
      formData.append("age", String(data.age));
    }

    /* -------- LOCATION -------- */
    if (data.location.coordinates) {
      formData.append(
        "location[coordinates][0]",
        String(data.location.coordinates[0])
      );
      formData.append(
        "location[coordinates][1]",
        String(data.location.coordinates[1])
      );
    }

    /* -------- BODY FEATURES -------- */
    Object.entries(data.bodyFeatures).forEach(([key, value]) => {
      if (value) {
        formData.append(`bodyFeatures[${key}]`, value);
      }
    });

    /* -------- OPTIONAL INFO -------- */
    if (data.costume) {
      formData.append("costume", data.costume);
    }

    if (data.markOnBody) {
      formData.append("markOnBody", data.markOnBody);
    }

    /* -------- API CALL -------- */
    const response = await API.post(
      "/api/missing/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },
};

export default UploadMissingPersonAPI;
