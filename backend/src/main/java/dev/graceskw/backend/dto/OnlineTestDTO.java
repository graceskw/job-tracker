package dev.graceskw.backend.dto;

import java.util.List;

import dev.graceskw.backend.enums.OnlineTestType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
public class OnlineTestDTO {
    private Long jobId;
    private String dateReceived;
    private String deadline;
    private String dateCompleted;
    private String notes;
    private String createdAt;
    private List<OnlineTestType> onlineTestTypes;

    public OnlineTestDTO() {
    }
}
