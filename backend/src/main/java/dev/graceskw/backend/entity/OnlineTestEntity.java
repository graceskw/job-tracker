package dev.graceskw.backend.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import dev.graceskw.backend.enums.CompletionStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "onlineTest")
public class OnlineTestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long onlineTestId;

    @ManyToOne
    @JoinColumn(name="jobId")
    private JobEntity job;

    @Column (nullable = false)
    private LocalDateTime dateReceived;

    @Column (nullable = false)
    private LocalDateTime deadline;

    @Column
    private LocalDateTime dateCompleted;

    @Column
    private String notes;

    @Column(updatable= false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column
    private CompletionStatus onlineTestStatus;

    public OnlineTestEntity() {
    }
}
