package ar.ensolvers.domain.Tag;


import lombok.AllArgsConstructor;
import lombok.Value;

@AllArgsConstructor
@Value
public class AddTagDto {

    private Integer idNote;
    private Integer idTag;
}
