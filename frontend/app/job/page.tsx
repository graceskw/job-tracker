'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

import { useEffect, useState } from "react"
import axios, { all, AxiosResponse } from 'axios';
import { Job } from "@/components/jobInterface"
import JobUpdateForm from "@/components/jobUpdateForm"
import { Plus, RefreshCw } from "lucide-react"



// tell axios what type of data to expect back
const fetchUser = async (id: number): Promise<Job> => {
  // Specify UserData as the generic type for the response data
  const response = await axios.get<Job>(`/api/jobs/${id}`);

  // TypeScript now knows that response.data is of type UserData
  return response.data;
};

// // Example usage
// fetchUser(1).then(user => {
//   console.log(user.name); // Type-safe access
// });

export default function jobPage() {
    // // [] bcuz want to run only once when component loads
    // useEffect(() => {
    // //    alert("This is a demo page. Functionality coming soon!") 
    //    axios.get('http://localhost:8080/api/jobs/2')
    //     .then(response => {
    //         alert('Job data: ' + JSON.stringify(response.data));
    //     })
    //     .catch(error => {
    //         alert('Error fetching job data: ' + error.message);
    //     });
    // }, [])
    const [allJobs, setAllJobs] = useState<Job[]>([]);
    const [jobId, setJobId] = useState(1);
    // state can be Job or null
    const [jobData, setJobData] = useState<Job>();

    const getAllJobs = () => {
        axios.get<Job[]>(`http://localhost:8080/api/jobs/allJobs`)
        .then(response => {
            setAllJobs(response.data);
            // alert('All jobs data: ' + JSON.stringify(response.data));
        })
        .catch(error => {
            alert('Error fetching all jobs data: ' + error.message);
        });
    }

    useEffect(() => {
        getAllJobs();
    }, [])

    const [openUpdateJob, setOpenUpdateJob] = useState(false)

    // const isDesktop = useMediaQuery("(min-width: 768px)")

    return (
        <div className="flex min-h-screen min-w-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <ResizablePanelGroup
            direction="horizontal"
            className="min-h-screen max-w-screen rounded-lg border md:min-w-[450px]"
            >
                <ResizablePanel defaultSize={25}>
                    <div className="h-full items-center justify-center p-6">
						<div className="flex flex-row justify-between mb-4">
							<span className="font-semibold">job list</span>
							<Button
								onClick={getAllJobs}
							>
								<RefreshCw className="size-4" />
							</Button>



							{/* <Dialog open={openUpdateJob} onOpenChange={setOpenUpdateJob}>
								<DialogTrigger asChild>
									<Button>
										<Plus className="size-4" />
									</Button>								
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px]">
									<DialogHeader>
										<DialogTitle>Edit Job Info</DialogTitle>
									</DialogHeader>
									<JobUpdateForm jobId={jobData?.jobId} />
								</DialogContent>
								</Dialog> */}
							
						</div>

						<table>
							<TableHeader>
								<TableRow>
									<TableHead>Company</TableHead>
									
									{/* <TableHead>Position</TableHead>
									<TableHead className="text-right">Status</TableHead> */}
								</TableRow>
							</TableHeader>
							<TableBody>
								{Object.values(allJobs).map((job) => (
								<TableRow key={job.jobId}>
									<TableCell className="font-medium"
										onClick={() => {
											setJobData(job);
											// alert('Job data: ' + JSON.stringify(job));
										}}
									>{job.companyName}</TableCell>
									{/* <TableCell>{job.position}</TableCell>
									<TableCell className="text-right">{job.currentStage}</TableCell> */}
								</TableRow>
								))}
							</TableBody>
						</table>
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />
                
                <ResizablePanel defaultSize={75}>
                    <div className="flex-col h-full items-center justify-center p-6">
                    {/* <span className="font-semibold">Job content</span> */}
                    <div className="flex flex-row gap-4">
                        <div className="max-w-md">
                            <h2 className="mb-4 text-2xl font-bold">{jobData?.companyName}</h2>
                            {/* <h2 className="mb-4 text-2xl font-bold">{jobList.cathay.company}</h2> */}
                            <a href={jobData?.jobURL} className="mb-4 text-lg font-medium text-blue-600 hover:underline">
                                {jobData?.jobPosition}
                            </a>
                            {/* ? == if not null sin access */}
                        </div>

                        <Dialog open={openUpdateJob} onOpenChange={setOpenUpdateJob}>
                            <DialogTrigger asChild>
                            <Button>Edit Job Info</Button>
                            </DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Edit Job Info</DialogTitle>

							</DialogHeader>
							<JobUpdateForm 
								job={jobData} 
								onSuccess={() => {
									setOpenUpdateJob(false);
									getAllJobs();
									if (jobData?.jobId) {
										axios.get<Job>(`http://localhost:8080/api/jobs/${jobData.jobId}`)
											.then(response => setJobData(response.data))
											.catch(error => console.error('Error refetching job:', error));
									}
								}}
							/>
							{/* <JobUpdateForm jobId={jobData?.jobId} /> */}
							</DialogContent>
                        </Dialog>

                        
                        <Button className="mb-2x inline-block rounded-lg bg-green-100 px-3 py-1 text-sm font-semibold text-green-800 max-h-10 hover:bg-green-200">
                            {jobData?.jobStatus}
                        </Button>
                    </div>


                    <div className="prose prose-zinc dark:prose-invert">
                        <Tabs defaultValue="stages">
                        {/* <Tabs defaultValue="stages" className="w-[400px]"> */}
                            <TabsList>
                                <TabsTrigger value="jobDesc">Job Description</TabsTrigger>
                                <TabsTrigger value="stages">Stages</TabsTrigger>
                            </TabsList>

                            <TabsContent value="jobDesc">
                                <p>{jobData?.jobDescription}</p>
                            </TabsContent>

                            <TabsContent value="stages">
                                <Button className="rounded-lg bg-green-500 px-2 py-2 text-white hover:bg-green-600">
                                    + Add stage
                                </Button>

                                <Table>
                                    <TableCaption>Application stages</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                        <TableHead className="w-[100px]">Done?</TableHead>
                                        <TableHead>Stage</TableHead>
                                        <TableHead className="text-red-600">Deadline</TableHead>
                                        {/* <TableHead>Date completed</TableHead>
                                        <TableHead className="text-right">Notes</TableHead> */}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {jobData?.onlineTests.map((stage) => (
                                        <TableRow key={stage.onlineTestId}>
                                            <TableCell>{stage.onlineTestStatus}</TableCell>
                                            <TableCell className="font-medium">{stage.onlineTestTypes.join(", ")}</TableCell>
                                            <TableCell className="text-red-600">{stage.deadline?.toString()}</TableCell>
                                            {/* <TableCell className="text-right">{stage.dateCompleted?.toString()}</TableCell>
                                            <TableCell className="text-right">{stage.notes}</TableCell> */}
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                            </TabsContent>
                        </Tabs>
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        {/* </main> */}
        </div>
    )
}

