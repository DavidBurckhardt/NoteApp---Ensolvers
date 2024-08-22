package ar.ensolvers.domain.Note;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ArchiveNoteDto {
    private List<Integer> noteIds;

    // Constructor con parámetros para deserialización
    @JsonCreator
    public ArchiveNoteDto(@JsonProperty("noteIds") List<Integer> noteIds) {
        this.noteIds = noteIds;
    }
}
