package dev.graceskw.backend.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;

import dev.graceskw.backend.enums.JobStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Data
@Builder
@AllArgsConstructor
@Table(name = "jobs")
public class JobEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobId;

    @Column(nullable = false)
    private String jobPosition;

    @Column(nullable = false)
    private String companyName;

    @Column (nullable = false)
    private LocalDateTime deadline;

    @Column(updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private String jobURL;

    @Column
    private JobStatus jobStatus;

    @Column
    private String jobDescription;
    
    @Column
    private String notes;

    @Column
    private LocalDateTime dateApplied;
    public JobEntity() {
    }
}
