package ar.ensolvers.infrastructure.output.impl;

import ar.ensolvers.domain.Note.NoteBo;
import ar.ensolvers.infrastructure.output.NoteStorage;

import ar.ensolvers.infrastructure.output.entity.Note;
import ar.ensolvers.infrastructure.output.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;


@Primary
@RequiredArgsConstructor
@Service
public class NoteStorageRep implements NoteStorage {

    private final NoteRepository noteRepository;

    @Override
    public void save(NoteBo note) {
        noteRepository.save(new Note(note));
    }

    @Override
    public NoteBo findNoteById(Integer id){
        return noteRepository.findNoteById(id);
    }

    @Override
    public void deleteNote(Integer id){
        noteRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        noteRepository.deleteAll();
    }

    @Override
    public void setArchiveNote(Integer id){
        noteRepository.setArchiveNote(id);
    }

    @Override
    public List<NoteBo> getAllNotes(){
        return noteRepository.getAllNotes();
    }

    @Override
    public List<NoteBo> getByArchivedStatus(Boolean archived){
        return noteRepository.getByArchivedStatus(archived);
    }

    @Override
    public void addTag(Integer id, Integer tag){
        noteRepository.addTag(id,tag);
    }

    @Override
    public void deleteTag(Integer id){
        noteRepository.deleteTag(id);
    }

    @Override
    public List<NoteBo> getByArchivedStatusAndCategory(Boolean archived, Integer tag){
        return noteRepository.getByArchivedStatusAndCategory(archived,tag);
    }

    @Override
    public List<NoteBo> getByTag(Integer tag){
        return noteRepository.getByTag(tag);
    }

}