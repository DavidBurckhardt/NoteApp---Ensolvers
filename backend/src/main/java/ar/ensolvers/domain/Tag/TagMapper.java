package ar.ensolvers.domain.Tag;

public class TagMapper {

    public static TagDto toDto(TagBo tagBo) {
        TagDto dto = new TagDto();
        dto.setId(tagBo.getId());
        dto.setName(tagBo.getName());
        return dto;
    }

    public static TagBo toBo(TagDto dto) {
        TagBo tagBo = new TagBo();
        tagBo.setId(dto.getId());
        tagBo.setName(dto.getName());
        return tagBo;
    }
}

