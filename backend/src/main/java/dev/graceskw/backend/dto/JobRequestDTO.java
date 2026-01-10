package dev.graceskw.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
public class JobRequestDTO {
    private String jobPosition;
    private String companyName;
    private String deadline;
    private String jobURL;
    private String jobDescription;

    public JobRequestDTO() {
    }
}
