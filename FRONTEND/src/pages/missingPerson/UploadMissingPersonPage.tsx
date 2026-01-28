import React, { useState } from "react";
import useUploadMissingPerson from "../../features/missingPerson/hooks/useUploadMissingPerson";
import { UploadMissingPersonPayload } from "../../features/missingPerson/type";

const UploadMissingPersonPage: React.FC = () => {

  /* -------------------------------
     HOOK
  ------------------------------- */
  const {
    uploadMissingPerson,
    loading,
    error,
  } = useUploadMissingPerson();

  /* -------------------------------
     FORM STATE
  ------------------------------- */

  const [formData, setFormData] =
    useState<UploadMissingPersonPayload>({
      name: "",
      age: "",
      photo: null,

      // TEMP: default coordinates (until map picker)
      location: {
        coordinates: [77.1025, 28.7041], // Delhi example
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

      costume: "",
      markOnBody: "",
    });

  const [submitted, setSubmitted] = useState(false);

  /* -------------------------------
     HANDLERS
  ------------------------------- */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

    const result = await uploadMissingPerson(formData);

    if (result.success) {
      setSubmitted(true);
    }
  };

  /* -------------------------------
     SUCCESS UI
  ------------------------------- */

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-green-400">
            ✅ Missing Person Report Submitted
          </h2>

          <p className="mt-4 text-gray-400">
            We’ve started searching.  
            You’ll be notified if someone reports a sighting.
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
      <div className="mx-auto max-w-xl space-y-6">

        <h1 className="text-3xl font-bold">
          Report a Missing Family Member
        </h1>

        <p className="text-gray-400 text-sm">
          Please fill this form only if you are a family member or guardian.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-white/5 px-4 py-3"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full rounded-xl bg-white/5 px-4 py-3"
          />

          <input
            type="file"
            accept="image/*"
            required
            onChange={handleFileChange}
          />

          <input
            name="height"
            placeholder="Height"
            onChange={handleFeatureChange}
            className="w-full rounded-xl bg-white/5 px-4 py-3"
          />

          <input
            name="eyeColor"
            placeholder="Eye Color"
            onChange={handleFeatureChange}
            className="w-full rounded-xl bg-white/5 px-4 py-3"
          />
          <select 
            name="gender" 
            value={formData.gender ?? ""}
            onChange={handleChange}
            className="w-full rounded-xl bg-neutral-950 text-white px-4 py-5 "
            >
            <option value="" className="bg-neutral-950 text-white">Select Gender(optional)</option>
            <option value="male" className="bg-neutral-900 text-white">Male</option>
            <option value="female" className="bg-neutral-900 text-white">Female</option>
            <option value="other" className="bg-neutral-900 text-white">Other/Prefer not to say</option>
          </select>

          <select 
          name="complexion"
            value={formData.bodyFeatures.complexion ?? ""}
            onChange={handleFeatureChange}
            className="w-full rounded-xl bg-neutral-950 text-white px-4 py-5"
          >
            <option value="">Select Complexion</option>
            <option className= "bg-neutral-900 text-white" value="fair">Fair</option>
            <option className= "bg-neutral-900 text-white" value="dark">Dark</option>
            <option className= "bg-neutral-900 text-white" value="medium">Medium</option>
          </select>
          <select
            name="build" 
            value={formData.bodyFeatures.build ?? ""}
            onChange={handleFeatureChange}
            className="w-full rounded-xl bg-neutral-950 text-white px-4 py-5"
          >
            <option value="" className="bg-neutral-900 text-white">Select Build</option>
            <option value="slim" className="bg-neutral-900 text-white">Slim</option>
            <option value="average" className="bg-neutral-900 text-white">Average</option>
            <option value="muscular" className="bg-neutral-900 text-white">Muscular</option>
          </select>
          <input
            name="costume"
            placeholder="Last Seen Clothing"
            onChange={handleChange}
            className="w-full rounded-xl bg-white/5 px-4 py-3"
          />

          <input
            name="markOnBody"
            placeholder="Any special mark / scar"
            onChange={handleChange}
            className="w-full rounded-xl bg-white/5 px-4 py-3"
          />

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Missing Report"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default UploadMissingPersonPage;
