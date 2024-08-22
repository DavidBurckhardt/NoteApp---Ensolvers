package ar.ensolvers.domain.Note;

import ar.ensolvers.infrastructure.output.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class NoteBo {

    private Integer id;
    private String title;
    private String text;
    private Boolean archived;
    private Tag tag;

    public NoteBo(){};

}
