interface Stage {
    id: number;
    dateReceived: Date;
    deadline: Date;
    dateCompleted: Date | null;
    completionStatus: string | null;
    testType: string | null;
    notes: string | null;
}