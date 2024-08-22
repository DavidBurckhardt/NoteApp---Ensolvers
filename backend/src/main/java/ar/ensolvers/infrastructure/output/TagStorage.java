package ar.ensolvers.infrastructure.output;

import ar.ensolvers.domain.Tag.TagBo;

import java.util.List;

public interface TagStorage {

    List<TagBo> getTags();
}
