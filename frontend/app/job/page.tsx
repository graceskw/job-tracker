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

export default function ResizableHandleDemo() {
  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen max-w-screen rounded-lg border md:min-w-[450px]"
        >
            <ResizablePanel defaultSize={25}>
                <div className="h-full items-center justify-center p-6">
                {/* <span className="font-semibold">job list</span> */}
                <table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Company</TableHead>
                            {/* <TableHead>Position</TableHead>
                            <TableHead className="text-right">Status</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.values(jobList).map((job) => (
                        <TableRow key={job.company}>
                            <TableCell className="font-medium">{job.company}</TableCell>
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
                        <h2 className="mb-4 text-2xl font-bold">{jobList.cathay.company}</h2>
                        <a href={jobList.cathay.url} className="mb-4 text-lg font-medium text-blue-600 hover:underline">
                            {jobList.cathay.position}
                        </a>
                    </div>
                    
                    <button className="mb-2x inline-block rounded-lg bg-green-100 px-3 py-1 text-sm font-semibold text-green-800 max-h-10 hover:bg-green-200">
                        {jobList.cathay.currentStage}
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
                            <p>Programme Introduction
                                At Cathay, our Digital and IT Team plays an important role in shaping the future of aviation technology. We offer two exciting opportunities for aspiring tech leaders: the Digital & IT Graduate Trainee Programme and the Greater Bay Area (GBA) Digital & IT Graduate Trainee Programme. Both are designed for young, passionate individuals who aspire to lead in the fields of technology and aviation.

                                Our programmes provide a structured development journey, featuring rotations across our Hong Kong Headquarters and the GBA. With personalised support and accelerated career progression, you will build a strong foundation to become one of Cathay’s future leaders in Hong Kong and the GBA.</p>
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
