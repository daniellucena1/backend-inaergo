export type FormsResponse = {
  forms: {
    id: number;
    title: string;
    pages: {
      id: number;
      page: number;
      fields: {
        id: number;
        type: "TEXT" | "RATING" | "CHECKBOX";
        question: string;
      }[];
    }[];
  };
}