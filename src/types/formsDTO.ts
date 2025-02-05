export type FormsDTO = {
    forms: {
        title: string;
        pages: {
            page: number;
            fields: {
                type: "TEXT" | "RATING" | "CHECKBOX";
                question: string;
            }[];
        }[];
    };
}