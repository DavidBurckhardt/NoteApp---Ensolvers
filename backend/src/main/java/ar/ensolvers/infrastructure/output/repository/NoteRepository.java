package ar.ensolvers.infrastructure.output.repository;

import ar.ensolvers.domain.Note.NoteBo;
import ar.ensolvers.infrastructure.output.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {

    @Transactional(readOnly = true)
    @Query("SELECT NEW ar.ensolvers.domain.Note.NoteBo(n.id, n.title, n.text, n.archived, t ) " +
            "FROM Note n " +
            "LEFT JOIN n.tag t " +
            "ORDER BY n.id")
    List<NoteBo> getAllNotes();

    @Transactional(readOnly = true)
    @Query("SELECT NEW ar.ensolvers.domain.Note.NoteBo(n.id, n.title, n.text, n.archived, t) " +
            "FROM Note n " +
            "LEFT JOIN n.tag t " +
            "WHERE n.id = :id")
    NoteBo findNoteById(@Param("id") Integer id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE note SET archived = NOT archived WHERE id = :id", nativeQuery = true)
    void setArchiveNote(@Param("id") Integer id);

    @Transactional(readOnly = true)
    @Query("SELECT NEW ar.ensolvers.domain.Note.NoteBo(n.id, n.title, n.text, n.archived, t) " +
            "FROM Note n " +
            "LEFT JOIN n.tag t " +
            "WHERE n.archived = :archived " +
            "ORDER BY n.id")
    List<NoteBo> getByArchivedStatus(@Param("archived") Boolean archived);

    @Transactional
    @Modifying
    @Query(value = "UPDATE note SET tag_id = :tag WHERE id = :id", nativeQuery = true)
    void addTag(@Param("id") Integer id,@Param("tag") Integer tag);

    @Transactional
    @Modifying
    @Query(value = "UPDATE note SET tag_id = NULL WHERE id = :id", nativeQuery = true)
    void deleteTag(@Param("id") Integer id);

    @Transactional(readOnly = true)
    @Query("SELECT NEW ar.ensolvers.domain.Note.NoteBo(n.id, n.title, n.text, n.archived, t) " +
            "FROM Note n " +
            "LEFT JOIN n.tag t " +
            "WHERE (:tag = 0 AND t.id IS NULL) " +
            "OR (:tag <> 0 AND t.id = :tag) " +
            "ORDER BY n.id")
    List<NoteBo> getByTag(@Param("tag") Integer tag);

    @Transactional(readOnly = true)
    @Query("SELECT NEW ar.ensolvers.domain.Note.NoteBo(n.id, n.title, n.text, n.archived, t) " +
            "FROM Note n " +
            "LEFT JOIN n.tag t " +
            "WHERE n.archived = :archived " +
            "AND (:tag = 0 AND t.id IS NULL OR :tag <> 0 AND t.id = :tag) " +
            "ORDER BY n.id")
    List<NoteBo> getByArchivedStatusAndCategory(@Param("archived") Boolean archived, @Param("tag") Integer tag);

}