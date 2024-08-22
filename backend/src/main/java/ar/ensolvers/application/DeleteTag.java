package ar.ensolvers.application;

import ar.ensolvers.infrastructure.output.NoteStorage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class DeleteTag {

    NoteStorage noteStorage;

    public void run(Integer id){
        noteStorage.deleteTag(id);
    }
}
