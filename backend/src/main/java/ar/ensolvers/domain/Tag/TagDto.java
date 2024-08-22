package ar.ensolvers.domain.Tag;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class TagDto {
    Integer id;
    String name;

    public TagDto() {}
}