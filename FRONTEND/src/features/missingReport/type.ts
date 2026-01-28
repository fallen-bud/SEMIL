export interface SearchMissingReportPayload {
  approxAge: number | "";
  photo: File | null;

  gender?: "male" | "female" | "other";

  foundLocation: {
    coordinates: [number, number] | null;
  };

  bodyFeatures: {
    height: string;
    weight?: string;
    eyeColor?: string;
    hairColor?: string;

    complexion?: "fair" | "medium" | "dark";
    build?: "slim" | "average" | "muscular" | "fat";

    beard?: string;
    otherMarks?: string;
  };

  notes?: string;
}
