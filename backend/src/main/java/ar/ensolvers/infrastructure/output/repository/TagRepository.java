package ar.ensolvers.infrastructure.output.repository;

import ar.ensolvers.domain.Note.NoteBo;
import ar.ensolvers.domain.Tag.TagBo;
import ar.ensolvers.infrastructure.output.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {

    @Transactional(readOnly = true)
    @Query("SELECT NEW ar.ensolvers.domain.Tag.TagBo(t.id,t.name) " +
            "FROM Tag t " +
            "ORDER BY t.id")
    List<TagBo> getAllTags();
}
