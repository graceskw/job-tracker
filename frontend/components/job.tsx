interface Job {
    id: number;
    jobPosition: string;
    companyName: string;
    deadline: Date;
    createdAt: Date | null;
    jobURL: string;
    status: string | null;
    jobDescription: string | null;
    notes: string | null;
}