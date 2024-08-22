package ar.ensolvers.infrastructure.output.impl;


import ar.ensolvers.domain.Tag.TagBo;
import ar.ensolvers.infrastructure.output.TagStorage;
import ar.ensolvers.infrastructure.output.entity.Tag;
import ar.ensolvers.infrastructure.output.repository.NoteRepository;
import ar.ensolvers.infrastructure.output.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Primary
@RequiredArgsConstructor
@Service
public class TagStorageRep implements TagStorage {

    private final TagRepository tagRepository;

    @Override
    public List<TagBo> getTags(){ return tagRepository.getAllTags();}
}
