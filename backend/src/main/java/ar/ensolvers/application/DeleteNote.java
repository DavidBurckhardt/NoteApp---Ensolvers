package ar.ensolvers.application;

import ar.ensolvers.infrastructure.output.NoteStorage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class DeleteNote {

    NoteStorage noteStorage;

    public void run(Integer id){
        noteStorage.deleteNote(id);
    }

}
