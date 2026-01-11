package dev.graceskw.backend.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import dev.graceskw.backend.enums.JobStatus;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Data
@Builder
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "jobId") // to prevent infinite recursion in bidirectional relationships
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

    // TODO: fix createdAt not being set automatically
    @Column(updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private String jobURL;

    @Column
    @Enumerated(EnumType.STRING) // specify that the enum should be stored as a string
    private JobStatus jobStatus;

    @Column
    private String jobDescription;
    
    @Column
    private String notes;

    @Column
    private LocalDateTime dateApplied;

    @Column
    @OneToMany(mappedBy="job", cascade=CascadeType.ALL)
    private List<OnlineTestEntity> onlineTests;

    public JobEntity() {
    }
}
