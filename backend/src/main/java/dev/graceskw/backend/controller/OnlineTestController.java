package dev.graceskw.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import dev.graceskw.backend.dto.OnlineTestDTO;
import dev.graceskw.backend.entity.JobEntity;
import dev.graceskw.backend.entity.OnlineTestEntity;
import dev.graceskw.backend.repository.OnlineTestRepository;
import dev.graceskw.backend.service.OnlineTestService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/onlineTests")
@Slf4j
public class OnlineTestController {
    @Autowired
    private OnlineTestRepository onlineTestRepository;

    @Autowired
    private OnlineTestService onlineTestService;

    @GetMapping("/allOnlineTests")
    public List<OnlineTestEntity> getAllOnlineTests() {
        List<OnlineTestEntity> onlineTests = onlineTestService.getAllOnlineTests();

        return onlineTests;
    }

    @PostMapping("/saveOnlineTest")
    @Transactional
    public ResponseEntity<OnlineTestEntity> createOnlineTest(@Valid @RequestBody OnlineTestDTO onlineTestRequest) {
        log.info("Received online test creation request: {}", onlineTestRequest);
        if(onlineTestRequest == null) {
            log.error("Online test request is null");
            return ResponseEntity.badRequest().build();
        }

        if (onlineTestRequest.getJobId() == null || onlineTestRequest.getDateReceived() == null || onlineTestRequest.getDeadline() == null || onlineTestRequest.getOnlineTestTypes() == null) {
            log.error("Missing required online test fields");
            return ResponseEntity.badRequest().build();
        }

        // TODO: check if online test for the job already exists, check by deadline+type

        OnlineTestEntity savedOnlineTest = onlineTestService.saveOnlineTest(onlineTestRequest);

        return ResponseEntity.ok(savedOnlineTest);
    }
}
