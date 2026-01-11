package dev.graceskw.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.graceskw.backend.entity.JobEntity;
import dev.graceskw.backend.enums.JobStatus;

public interface JobRepository extends JpaRepository<JobEntity, Long> {
    List<JobEntity> findAll();

    List<JobEntity> findAllByCompanyNameIgnoreCase(String companyName);

    List<JobEntity> findAllByJobPositionIgnoreCase(String jobPosition);

    List<JobEntity> findAllByJobStatus(JobStatus status);

    List<JobEntity> findAllByDeadlineBefore(java.time.LocalDateTime deadline);
    
    List<JobEntity> findAllByDeadlineAfter(java.time.LocalDateTime deadline);

    // Optional: return Optional object regardless of whether the entity is found
    // to avoid null pointer exceptions
    Optional<JobEntity> findByJobId(Long id);
}
