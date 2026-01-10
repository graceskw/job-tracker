package dev.graceskw.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import java.time.DateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@Table(name = "jobs")
public class JobEntity {
    @id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String jobPosition;

    @Column(nullable = false)
    private String companyName;

    @Column (nullable = false)
    private DateTime deadline;

    @Column(nullable = false, updatable = false)
    @CreatedDate
    private DateTime createdAt;

    @Column(nullable = false)
    private String jobURL;

    @Column
    private String status;

    @Column
    private String jobDescription;
    
    @Column
    private String notes;

    public JobEntity() {
    }
}
