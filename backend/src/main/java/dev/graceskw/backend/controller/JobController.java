package dev.graceskw.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import dev.graceskw.backend.dto.JobRequestDTO;
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
    public ResponseEntity<JobEntity> createJob(@Valid @RequestBody JobRequestDTO jobRequest) {
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
        
        return ResponseEntity.ok(job);
    }


}