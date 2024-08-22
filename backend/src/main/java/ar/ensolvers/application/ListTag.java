package ar.ensolvers.application;

import ar.ensolvers.domain.Tag.TagBo;
import ar.ensolvers.infrastructure.output.TagStorage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ListTag {

    TagStorage tagStorage;

    public List<TagBo> run() {
        return tagStorage.getTags();
    }
}
