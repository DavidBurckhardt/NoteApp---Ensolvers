package ar.ensolvers.infrastructure.input;

import ar.ensolvers.application.AddTag;
import ar.ensolvers.application.DeleteTag;
import ar.ensolvers.application.ListTag;
import ar.ensolvers.domain.ApiResponse;
import ar.ensolvers.domain.Note.NoteBo;
import ar.ensolvers.domain.Note.NoteDto;
import ar.ensolvers.domain.Note.NoteMapper;
import ar.ensolvers.domain.Tag.AddTagDto;
import ar.ensolvers.domain.Tag.TagBo;
import ar.ensolvers.domain.Tag.TagDto;
import ar.ensolvers.domain.Tag.TagMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@RequestMapping("/tag")
public class TagController {

    private final AddTag addTag;
    private final DeleteTag deleteTag;
    private ListTag listTag;

    @PutMapping("/addToNote")
    public ResponseEntity<?> addTag(@RequestBody AddTagDto addTagDto){
        addTag.run(addTagDto);
        ApiResponse apiResponse = new ApiResponse("Tag added");
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PutMapping("/deleteFromNote/{id}")
    public ResponseEntity<?> deleteTag(@PathVariable Integer id){
        deleteTag.run(id);
        ApiResponse apiResponse = new ApiResponse("Tag deleted");
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/list")
    public List<TagDto> listTags(){
        List<TagBo> tags = listTag.run();
        return tags.stream().map(TagMapper::toDto).collect(Collectors.toList());
    }
}
