package ar.ensolvers.application;

import ar.ensolvers.domain.Note.NewNoteDto;
import ar.ensolvers.domain.Note.NoteBo;
import ar.ensolvers.infrastructure.output.NoteStorage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class NewNote {

    NoteStorage noteStorage;

    public void run(NewNoteDto newNote){
        String title = newNote.getTitle();
        String text = newNote.getText();
        NoteBo note = new NoteBo(null,title, text,false, null);
        noteStorage.save(note);
    }
}
