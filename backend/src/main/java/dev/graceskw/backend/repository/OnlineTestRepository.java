package dev.graceskw.backend.repository;

import java.util.List;
// import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.graceskw.backend.entity.OnlineTestEntity;
import dev.graceskw.backend.enums.CompletionStatus;

public interface OnlineTestRepository extends JpaRepository<OnlineTestEntity, Long> {
    List<OnlineTestEntity> findAll();

    List<OnlineTestEntity> findAllByOnlineTestStatus(CompletionStatus status);

    List<OnlineTestEntity> findAllByDeadlineBefore(java.time.LocalDateTime deadline);
    
    List<OnlineTestEntity> findAllByDeadlineAfter(java.time.LocalDateTime deadline);

    // // Optional: return Optional object regardless of whether the entity is found
    // // to avoid null pointer exceptions
    // Optional<OnlineTestEntity> findByJobId(Long id);
}
