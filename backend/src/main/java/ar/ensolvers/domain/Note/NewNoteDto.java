package ar.ensolvers.domain.Note;

import lombok.AllArgsConstructor;
import lombok.Value;

@AllArgsConstructor
@Value
public class NewNoteDto {

    private String title;
    private String text;

}
