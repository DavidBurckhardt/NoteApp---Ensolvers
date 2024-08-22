package ar.ensolvers.application;

import ar.ensolvers.infrastructure.output.NoteStorage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class DeleteAllNotes {

    NoteStorage noteStorage;

    public void run(){
        noteStorage.deleteAll();
    }
}
