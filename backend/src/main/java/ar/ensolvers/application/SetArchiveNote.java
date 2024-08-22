package ar.ensolvers.application;

import ar.ensolvers.domain.Note.ArchiveNoteDto;
import ar.ensolvers.infrastructure.output.NoteStorage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class SetArchiveNote {

    NoteStorage noteStorage;

    public void run(ArchiveNoteDto notesToArchive) {
        List<Integer> notes = notesToArchive.getNoteIds();
        for (Integer noteId : notes) {
            noteStorage.setArchiveNote(noteId);
        }
    }

}
