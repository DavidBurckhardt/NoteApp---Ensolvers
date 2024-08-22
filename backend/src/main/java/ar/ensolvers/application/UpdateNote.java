package ar.ensolvers.application;

import ar.ensolvers.domain.Note.NewNoteDto;
import ar.ensolvers.domain.Note.NoteBo;
import ar.ensolvers.infrastructure.output.NoteStorage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UpdateNote {

    NoteStorage noteStorage;

    public void run(Integer id, NewNoteDto newNote){
        NoteBo oldNote = noteStorage.findNoteById(id);

        // Actualiza las propiedades de la nota existente
        oldNote.setTitle(newNote.getTitle());
        oldNote.setText(newNote.getText());

        noteStorage.save(oldNote);
    }
}
