package dev.graceskw.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
public class JobDTO {
    private Long jobId;
    private String jobPosition;
    private String companyName;
    private String deadline;
    private String jobURL;
    private String jobStatus;
    private String jobDescription;
    private String notes;
    private String dateApplied;

    public JobDTO() {
    }
}
