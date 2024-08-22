package ar.ensolvers.infrastructure.input;

import ar.ensolvers.application.*;
import ar.ensolvers.domain.*;
import ar.ensolvers.domain.Note.*;
import ar.ensolvers.domain.Tag.AddTagDto;
import ar.ensolvers.infrastructure.output.NoteStorage;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@RequestMapping("/note")
public class NoteController {

    private final NewNote newNote;
    private final ListNote listNote;
    private final DeleteNote deleteNote;
    private final DeleteAllNotes deleteAllNotes;
    private final UpdateNote updateNote;
    private final NoteStorage noteStorage;
    private final SetArchiveNote setArchiveNote;


    @PostMapping("/new")
    public ResponseEntity<?> newNote(@RequestBody NewNoteDto note){
        newNote.run(note);
        return ResponseEntity.status(HttpStatus.CREATED).body(note);
    }

    @GetMapping("/list")
    public List<NoteDto> listNotes(
            @RequestParam(required = false) Boolean archived,
            @RequestParam(required = false) Integer tag){

        List<NoteBo> notes = listNote.run(archived, tag);

        return notes.stream()
                .map(NoteMapper::toDto)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Integer id){
        deleteNote.run(id);
        ApiResponse apiResponse = new ApiResponse("Note deleted");
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<?> deleteAllNotes(){
        deleteAllNotes.run();
        ApiResponse apiResponse = new ApiResponse("All notes deleted");
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<NoteDto> updateNote(@PathVariable Integer id, @RequestBody NewNoteDto note){
        updateNote.run(id, note);
        NoteBo updatedNote = noteStorage.findNoteById(id);
        NoteDto dto = NoteMapper.toDto(updatedNote);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/archive")
    public ResponseEntity<?> archiveNote(@RequestBody ArchiveNoteDto notes){
        setArchiveNote.run(notes);
        ApiResponse apiResponse = new ApiResponse("Set archive notes");
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

}
