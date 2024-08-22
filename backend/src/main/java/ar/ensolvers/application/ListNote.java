package ar.ensolvers.application;

import ar.ensolvers.domain.Note.NoteBo;
import ar.ensolvers.infrastructure.output.NoteStorage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ListNote {

    NoteStorage noteStorage;

    public List<NoteBo> run(Boolean archived, Integer tag) {
        if (archived == null && tag == null) {
            return noteStorage.getAllNotes();
        } else if (archived != null && tag != null) {
            return noteStorage.getByArchivedStatusAndCategory(archived, tag);
        } else if (archived != null) {
            return noteStorage.getByArchivedStatus(archived);
        } else { // category != null
            return noteStorage.getByTag(tag);
        }
    }
}
