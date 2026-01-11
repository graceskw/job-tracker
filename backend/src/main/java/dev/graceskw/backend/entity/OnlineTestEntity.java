package dev.graceskw.backend.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import dev.graceskw.backend.enums.CompletionStatus;
import dev.graceskw.backend.enums.OnlineTestType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "onlineTestId") // to prevent infinite recursion in bidirectional relationships
@Table(name = "onlineTest")
public class OnlineTestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long onlineTestId;

    @ManyToOne
    @JoinColumn(name="jobId", nullable=false)
    private JobEntity job;

    @Column (nullable = false)
    private LocalDateTime dateReceived;

    @Column (nullable = false)
    private LocalDateTime deadline;

    @Column
    private LocalDateTime dateCompleted;

    @Column
    private String notes;

    // TODO: fix createdAt not being set automatically
    @Column(updatable= false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column
    @Enumerated(EnumType.STRING) // specify that the enum should be stored as a string
    private CompletionStatus onlineTestStatus;

    @Column (nullable = false)
    private List<OnlineTestType> onlineTestTypes;               

    public OnlineTestEntity() {
    }
}
