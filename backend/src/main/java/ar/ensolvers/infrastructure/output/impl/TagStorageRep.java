package ar.ensolvers.infrastructure.output.impl;


import ar.ensolvers.domain.Tag.TagBo;
import ar.ensolvers.infrastructure.output.TagStorage;
import ar.ensolvers.infrastructure.output.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;

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
