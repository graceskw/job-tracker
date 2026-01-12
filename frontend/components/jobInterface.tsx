export interface Job {
  jobId: number
  jobPosition: string
  companyName: string
  deadline: Date
  createdAt: Date | null
  jobURL: string
  jobStatus: string | null
  jobDescription: string
  notes: string | ""
  dateApplied: Date | null
  onlineTests: OnlineTest[]
}

export interface OnlineTest {
  onlineTestId: number
  job: number
  dateReceived: Date
  deadline: Date
  dateCompleted: Date | null
  notes: string | ""
  createdAt: Date | null
  onlineTestStatus: string | null
  onlineTestTypes: string[]
}
