package dev.graceskw.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.graceskw.backend.dto.JobDTO;
import dev.graceskw.backend.entity.JobEntity;
import dev.graceskw.backend.repository.JobRepository;
import dev.graceskw.backend.service.JobService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;



@RestController
@RequestMapping("/api/jobs")
@Slf4j
public class JobController {
    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private JobService jobService;

    @PostMapping("/saveJob")
    @Transactional
    public ResponseEntity<JobEntity> createJob(@Valid @RequestBody JobDTO jobRequest) {
        log.info("Received job creation request: {}", jobRequest);
        if(jobRequest == null) {
            log.error("Job request is null");
            return ResponseEntity.badRequest().build();
        }

        if (jobRequest.getJobPosition() == null || jobRequest.getCompanyName() == null || jobRequest.getDeadline() == null || jobRequest.getJobURL() == null) {
            log.error("Missing required job fields");
            return ResponseEntity.badRequest().build();
        }

        // TODO: check if position+company+deadline combination already exists

        JobEntity savedJob = jobService.saveJob(jobRequest);
        
        return ResponseEntity.ok(savedJob);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobEntity> getJobById(@PathVariable Long id) {
        if(id == null || id <= 0) {
            log.error("Invalid job ID: {}", id);
            return ResponseEntity.badRequest().build();
        } 

        JobEntity job = jobService.getJobById(id);
        
        // return 404 if job not found
        if (job == null) {
            log.error("Job not found with ID: {}", id);
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(job);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteJobById(@PathVariable Long id) {
        if(id == null || id <= 0) {
            log.error("Invalid job ID: {}", id);
            return ResponseEntity.badRequest().build();
        }

        jobService.deleteJobById(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/allJobs")
    public List<JobEntity> getAllJobs() {
        List<JobEntity> jobs = jobService.getAllJobs();

        return jobs;
    }

    @PostMapping("/updateJob/{id}")
    public ResponseEntity<JobEntity> postMethodName(@RequestBody JobDTO jobRequest, @PathVariable Long id) {
        if(jobRequest == null) {
            log.error("Job request is null");
            return ResponseEntity.badRequest().build();
        }

        if(id == null) {
            log.error("Job request is missing job ID");
            return ResponseEntity.badRequest().build();
        }

        if(jobRequest.getJobPosition() == null || jobRequest.getJobPosition().isBlank()) {
            log.error("Missing required job position");
            return ResponseEntity.badRequest().build();
        }

        if(jobRequest.getCompanyName() == null || jobRequest.getCompanyName().isBlank()) {
            log.error("Missing required job company name");
            return ResponseEntity.badRequest().build();
        }
        
        if(jobRequest.getDeadline() == null || jobRequest.getDeadline().isBlank()) {
            log.error("Missing required job deadline");
            return ResponseEntity.badRequest().build();
        }

        if(jobRequest.getJobURL() == null || jobRequest.getJobURL().isBlank()) {
            log.error("Missing required job URL");
            return ResponseEntity.badRequest().build();
        }

        JobEntity jobToUpdate = jobRepository.findByJobId(id).orElse(null);
        
        if (jobToUpdate == null) {
            log.error("Job not found with ID: {}", id);
            return ResponseEntity.notFound().build();
        }
        
       jobToUpdate = jobService.updateJob(jobRequest, jobToUpdate);
        
        return ResponseEntity.ok(jobToUpdate);
    }
    
    

    // @PostMapping("/updateJobStatus/")
    // @Transactional
    // public ResponseEntity<JobEntity> updateJobStatus(@Valid @RequestBody JobStatusDTO jobStatus) {
    //     if (jobStatus == null || jobStatus.getJobID() == null || jobStatus.getStatus() == null) {
    //         log.error("Invalid job status update request");
    //         return ResponseEntity.badRequest().build();
    //     }

    //     if (jobRepository.findByJobID(jobStatus.getJobID()).isEmpty()) {
    //         log.error("Job with ID {} not found", jobStatus.getJobID());
    //         return ResponseEntity.notFound().build();
    //     }

    //     if (jobStatus.getStatus() == "") {
    //         log.error("Status cannot be empty");
    //         return ResponseEntity.badRequest().build();
    //     } else if (jobStatus.getStatus() ) {
    //         JobEntity jobToUpdate = jobRepository.findByJobID(jobStatus.getJobID()).get(0);
    //         jobToUpdate.setStatus(jobStatus.getStatus());
    //         JobEntity updatedJob = jobRepository.save(jobToUpdate);
    //         log.info("Job status updated successfully for ID: {}", updatedJob.getId());
    //         return ResponseEntity.ok(updatedJob);
    //     } else {
    //         log.error("Invalid status value: {}", jobStatus.getStatus());
    //         return ResponseEntity.badRequest().build();
    //     }

}