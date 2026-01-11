'use client'

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

import jobList from "./jobList.json"
import stageInfo from "./jobStage.json"
import { useEffect, useState } from "react"
import axios, { all, AxiosResponse } from 'axios';
import { serialize } from "v8"
import { get } from "http"

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

export default function ResizableHandleDemo() {
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
    const [jobData, setJobData] = useState<Job | null>(null);

    const getAllJobs = () => {
        axios.get<Job[]>(`http://localhost:8080/api/jobs/allJobs`)
        .then(response => {
            setAllJobs(response.data);
        })
        .catch(error => {
            alert('Error fetching all jobs data: ' + error.message);
        });
    }

    useEffect(() => {
        getAllJobs();
    }, [])

    return (
        <div className="flex min-h-screen min-w-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <ResizablePanelGroup
            direction="horizontal"
            className="min-h-screen max-w-screen rounded-lg border md:min-w-[450px]"
            >
                <ResizablePanel defaultSize={25}>
                    <div className="h-full items-center justify-center p-6">

                        {/* <input
                            type="number"
                            placeholder="Search jobs..."
                            className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                            value={jobId}
                            onChange={(e) => setJobId(Number(e.target.value))}
                        /> {jobId}

                        <button
                            className="mb-4 w-full rounded-md bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
                            onClick={() => {
                                axios.get(`http://localhost:8080/api/jobs/${jobId}`)
                                .then(response => {
                                    setJobData(response.data);
                                    alert('Job data: ' + JSON.stringify(response.data));
                                })
                                .catch(error => {
                                    alert('Error fetching job data: ' + error.message);
                                });
                            }}
                        >
                            Fetch Job Data
                        </button> */}

                    {/* <span className="font-semibold">job list</span> */}
                    <table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Company</TableHead>
                                <span
                                    onClick={getAllJobs}
                                >🔄</span>
                                {/* <TableHead>Position</TableHead>
                                <TableHead className="text-right">Status</TableHead> */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Object.values(allJobs).map((job) => (
                            <TableRow key={job.companyName}>
                                <TableCell className="font-medium"
                                    onClick={() => {
                                        setJobData(job);
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
                            <a href={jobList.cathay.url} className="mb-4 text-lg font-medium text-blue-600 hover:underline">
                                {jobData?.jobPosition}
                            </a>
                            {/* ? == if not null sin access */}
                        </div>
                        
                        <button className="mb-2x inline-block rounded-lg bg-green-100 px-3 py-1 text-sm font-semibold text-green-800 max-h-10 hover:bg-green-200">
                            {jobData?.status}
                        </button>
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
                                <button className="rounded-lg bg-green-500 px-2 py-2 text-white hover:bg-green-600">
                                    + Add stage
                                </button>

                                <Table>
                                    <TableCaption>Application stages</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                        <TableHead className="w-[100px]">Done?</TableHead>
                                        <TableHead>Stage</TableHead>
                                        <TableHead className="text-red-600">Deadline</TableHead>
                                        <TableHead>Date completed</TableHead>
                                        <TableHead className="text-right">Notes</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {stageInfo.cathay.map((stage) => (
                                        <TableRow key={stage.stage}>
                                            <TableCell className="font-medium">{stage.done}</TableCell>
                                            <TableCell>{stage.stage}</TableCell>
                                            <TableCell className="text-red-600">{stage.deadline}</TableCell>
                                            <TableCell className="text-right">{stage.dateCompleted}</TableCell>
                                            <TableCell className="text-right">{stage.notes}</TableCell>
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
