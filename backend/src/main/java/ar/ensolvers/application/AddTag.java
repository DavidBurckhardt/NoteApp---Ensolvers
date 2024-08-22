package ar.ensolvers.application;

import ar.ensolvers.domain.Tag.AddTagDto;
import ar.ensolvers.infrastructure.output.NoteStorage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class AddTag {

    NoteStorage noteStorage;

    public void run(AddTagDto addTagDto){
        Integer id = addTagDto.getIdNote();
        Integer tag = addTagDto.getIdTag();
        noteStorage.addTag(id,tag);
    }
}
