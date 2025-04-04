export type FormsDTO = {
    forms: {
        title: string;
        pages: {
            page: number;
            title: string;
            fields: {
                type: "TEXT" | "RATING" | "CHECKBOX";
                question: string;
                profile: "NORMAL" | "COLLECTIVIST" | "INDIVIDUALIST";
            }[];
        }[];
    };
}