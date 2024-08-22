package ar.ensolvers.domain.Tag;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class TagBo {
    Integer id;
    String name;

    public TagBo() {}
}
