export interface UploadMissingPersonPayload {
  name: string;
  age: number | "";
  photo: File | null;

  gender?: "male" | "female" | "other";

  location: {
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

  costume?: string;
  markOnBody?: string;
}
