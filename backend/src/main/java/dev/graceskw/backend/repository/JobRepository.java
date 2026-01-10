package dev.graceskw.backend.repository;

import dev.graceskw.backend.entity.JobEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<JobEntity, Long> {
    List<JobEntity> findAllByCompanyNameIgnoreCase(String companyName);

    List<JobEntity> findAllByJobPositionIgnoreCase(String jobPosition);

    List<JobEntity> findAllByStatus(String status);

    List<JobEntity> findAllByDeadlineBefore(java.time.DateTime deadline);

    List<JobEntity> findByJobID(Long id);
}
