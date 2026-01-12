import { useEffect, useState } from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "./ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Job } from "@/components/jobInterface"
import axios from "axios"


export default function JobUpdateForm({ jobId, className }: React.ComponentProps<"form"> & { jobId?: number }) {
	const [openJobDeadline, setOpenJobDeadline] = useState(false)
	const [jobDeadline, setJobDeadline] = useState<Date | undefined>(undefined)
	const [openDateApplied, setOpenDateApplied] = useState(false)
	const [dateApplied, setDateApplied] = useState<Date | undefined>(undefined)
    const [jobData, setJobData] = useState<Job | null>(null);
    const getJobData = () => {
        axios.get<Job>(`http://localhost:8080/api/jobs/${jobId}`)
        .then(response => {
            setJobData(response.data);
            // alert('All jobs data: ' + JSON.stringify(response.data));
            setJobDeadline(response.data.deadline ? new Date(response.data.deadline) : undefined);
            setDateApplied(response.data.dateApplied ? new Date(response.data.dateApplied) : undefined);
        })
        .catch(error => {
            alert('Error fetching all jobs data: ' + error.message);
        });
    }

    const formatDateForBackend = (date: Date | undefined) => {
        if (!date) return null;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}T00:00:00`;
    };

    const updateJobData = () => {
        axios.post(`http://localhost:8080/api/jobs/updateJob/${jobId}`, {
            jobPosition: jobData?.jobPosition,
            companyName: jobData?.companyName,
            jobURL: jobData?.jobURL,
            deadline: formatDateForBackend(jobDeadline),
            dateApplied: formatDateForBackend(dateApplied),
            notes: jobData?.notes,
        })
        .then(response => {
            alert('Job updated successfully!');
        })
        .catch(error => {
            alert('Error updating job: ' + error.message);
        });
    }

    useEffect(() => {
        getJobData();
    }, [])
    
  return (
    <form >
        <div className="grid w-full max-w-sm gap-4">
            <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="jobPosition">Position</Label>
                <Input
                    id="jobPosition"
                    className="col-span-2 h-8"
                    defaultValue={jobData?.jobPosition}
                />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="jobCompany">Company</Label>
                <Input
                    id="jobCompany"
                    className="col-span-2 h-8"
                    defaultValue={jobData?.companyName}
                />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="jobURL">URL</Label>
                <Input
                    id="jobCompany"
                    className="col-span-2 h-8"
                    defaultValue={jobData?.jobURL}
                />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="jobDeadline">Deadline</Label>
                <div className="flex flex-col gap-3">
                    <Popover open={openJobDeadline} onOpenChange={setOpenJobDeadline}>
                        <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date"
                            className="justify-between font-normal col-span-2 h-8"
                        >
                            {jobDeadline ? jobDeadline.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={jobDeadline}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                            setJobDeadline(date)
                            setOpenJobDeadline(false)
                            }}
                        />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="dateApplied">Date Applied</Label>
                    <div className="flex flex-col gap-3">
                    <Popover open={openDateApplied} onOpenChange={setOpenDateApplied}>
                        <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date"
                            className="justify-between font-normal col-span-2 h-8"
                        >
                            {dateApplied ? dateApplied.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={dateApplied}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                            setDateApplied(date)
                            setOpenDateApplied(false)
                            }}
                        />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

        {/* <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="jobStatus">Application Status</Label>
                <Select>
                    <SelectTrigger className="col-span-2 h-8">
                            <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="INTERESTED">Interested</SelectItem>
                        <SelectItem value="APPLIED">Applied</SelectItem>
                        <SelectItem value="DO_ONLINE_TEST">Do Online Test</SelectItem>
                        <SelectItem value="COMPLETED_ONLINE_TEST">Completed Online Test</SelectItem>
                        <SelectItem value="INTERVIEW_SCHEDULED">Interview Scheduled</SelectItem>
                        <SelectItem value="COMPLETED_INTERVIEW">Completed Interview</SelectItem>
                        <SelectItem value="OFFERED">Offered</SelectItem>
                        <SelectItem value="REJECTED">Rejected</SelectItem>
                        <SelectItem value="WITHDRAWN">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div> */}

        <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="notes">Notes</Label>
                <div className="col-span-2">
                    <InputGroup>
                        <InputGroupTextarea placeholder="Enter your message" defaultValue={jobData?.notes} />
                        <InputGroupAddon align="block-end">
                        <InputGroupText className="text-muted-foreground text-xs">
                            120 characters left
                        </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </div>

        <Button type="submit"
            onClick={(e) => {
                e.preventDefault();
                updateJobData();
            }}
        >Save changes</Button>

        </div>
    </form>
  )
}
