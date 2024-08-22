package ar.ensolvers.infrastructure.output;

import ar.ensolvers.domain.Note.NoteBo;
import java.util.List;

public interface NoteStorage {

    void save(NoteBo note);

    NoteBo findNoteById(Integer id);

    void deleteNote(Integer id);

    void deleteAll();

    void setArchiveNote(Integer id);

    List<NoteBo> getAllNotes();

    List<NoteBo> getByArchivedStatus(Boolean archived);

    void addTag(Integer id, Integer tag);

    void deleteTag(Integer id);

    List<NoteBo> getByArchivedStatusAndCategory(Boolean archived, Integer tag);

    List<NoteBo> getByTag(Integer tag);

}