package dev.graceskw.backend.controller;

import dev.graceskw.backend.repository.JobRepository;
import dev.graceskw.backend.entity.JobEntity;
import dev.graceskw.backend.dto.JobRequestDTO;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
@Slf4j
public class JobController {
    @Autowired
    private JobRepository jobRepository;

}
