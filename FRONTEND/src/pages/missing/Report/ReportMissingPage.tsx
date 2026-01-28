import React, { useState } from "react";
import SearchMissingReportAPI from "../../../features/missingReport/services/missingReport";
import { SearchMissingReportPayload } from "../../../features/missingReport/type";

/* ------------------------------------
   TYPES
------------------------------------ */

type SubmitStatus = "idle" | "saved" | "matched";

/* ------------------------------------
   COMPONENT
------------------------------------ */

const SearchMissingReportPage: React.FC = () => {

  /* -------------------------------
     FORM STATE (PUBLIC OBSERVATION)
  ------------------------------- */

  const [formData, setFormData] = useState<SearchMissingReportPayload>({
    approxAge: "",
    photo: null,

    foundLocation: {
      coordinates: [77.1025, 28.7041], // temp (Delhi)
    },

    bodyFeatures: {
      height: "",
      weight: "",
      eyeColor: "",
      hairColor: "",
      complexion: undefined,
      build: undefined,
      beard: "",
      otherMarks: "",
    },

    notes: "",
    gender: undefined,
  });

  /* -------------------------------
     UI STATE
  ------------------------------- */

  const [submitStatus, setSubmitStatus] =
    useState<SubmitStatus>("idle");

  const [result, setResult] = useState<any>(null);

  /* -------------------------------
     HANDLERS
  ------------------------------- */

  // for top-level fields (approxAge, gender, notes)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // for bodyFeatures
  const handleFeatureChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      bodyFeatures: {
        ...prev.bodyFeatures,
        [name]: value,
      },
    }));
  };

  // photo
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({
        ...prev,
        photo: e.target.files![0],
      }));
    }
  };

  /* -------------------------------
     SUBMIT
  ------------------------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response =
        await SearchMissingReportAPI.upload(formData);

      setResult(response);

      if (response.matchFound) {
        setSubmitStatus("matched");
      } else {
        setSubmitStatus("saved");
      }
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  /* -------------------------------
     RESULT UI
  ------------------------------- */

  if (submitStatus === "saved") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-400">
            ✅ Report Saved
          </h2>
          <p className="mt-3 text-gray-400">
            We’ll notify the family if a match is found.
          </p>
        </div>
      </div>
    );
  }

  if (submitStatus === "matched") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-indigo-400">
            🎯 Possible Match Found
          </h2>

          <img
            src={result.match.photoUrl}
            className="mx-auto mt-4 h-40 rounded-xl object-cover"
          />

          <p className="mt-3 text-gray-400">
            Similarity: <b>{result.similarity?.toFixed(1)}%</b>
          </p>
        </div>
      </div>
    );
  }

  /* -------------------------------
     FORM UI
  ------------------------------- */

  return (
    <div className="min-h-screen bg-black px-4 py-24 text-white">
      <div className="mx-auto max-w-xl space-y-4">

        <h1 className="text-3xl font-bold">
          Found a Person?
        </h1>

        <p className="text-gray-400 text-sm">
          Please share what you observed. Even small details help.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="file"
            accept="image/*"
            required
            onChange={handleFileChange}
          />

          <input
            type="number"
            name="approxAge"
            placeholder="Approximate Age"
            value={formData.approxAge}
            onChange={handleChange}
            className="w-full rounded-xl bg-white/5 px-4 py-3"
          />

          <select
            name="gender"
            value={formData.gender ?? ""}
            onChange={handleChange}
            className="w-full rounded-xl bg-neutral-900 text-white px-4 py-3"
          >
            <option value="">Select Gender (optional)</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other / Prefer not to say</option>
          </select>

          <select
            name="complexion"
            value={formData.bodyFeatures.complexion ?? ""}
            onChange={handleFeatureChange}
            className="w-full rounded-xl bg-neutral-900 text-white px-4 py-3"
          >
            <option value="">Select Complexion</option>
            <option value="fair">Fair</option>
            <option value="medium">Medium</option>
            <option value="dark">Dark</option>
          </select>

          <select
            name="build"
            value={formData.bodyFeatures.build ?? ""}
            onChange={handleFeatureChange}
            className="w-full rounded-xl bg-neutral-900 text-white px-4 py-3"
          >
            <option value="">Select Build</option>
            <option value="slim">Slim</option>
            <option value="average">Average</option>
            <option value="muscular">Muscular</option>
            <option value="fat">Fat</option>
          </select>

          <input
            name="otherMarks"
            placeholder="Any visible marks (optional)"
            onChange={handleFeatureChange}
            className="w-full rounded-xl bg-white/5 px-4 py-3"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold"
          >
            Submit Sighting
          </button>

        </form>
      </div>
    </div>
  );
};

export default SearchMissingReportPage;
