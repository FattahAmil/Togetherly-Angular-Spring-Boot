package fattahAmil.BackendProject.Dto;

import fattahAmil.BackendProject.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    private String content;
    private boolean isEvent;
    private String id;
    private List<MediaDto> mediaList;
}
