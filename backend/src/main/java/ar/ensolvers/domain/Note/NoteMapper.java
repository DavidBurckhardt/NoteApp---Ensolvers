package ar.ensolvers.domain.Note;

import ar.ensolvers.domain.Tag.TagBo;
import ar.ensolvers.domain.Tag.TagDto;
import ar.ensolvers.infrastructure.output.entity.Tag;

import javax.imageio.plugins.tiff.TIFFDirectory;

public class NoteMapper {

    private static TIFFDirectory note;

    public static NoteDto toDto(NoteBo noteBo) {
        NoteDto dto = new NoteDto();
        dto.setId(noteBo.getId());
        dto.setTitle(noteBo.getTitle());
        dto.setText(noteBo.getText());
        dto.setArchived(noteBo.getArchived());
        if(noteBo.getTag() != null){
            Tag tag = new Tag(noteBo.getTag().getId(), noteBo.getTag().getName());
            dto.setTag(tag);
        }else{
            dto.setTag(null);
        }
        return dto;
    }

    public static NoteBo toBo(NoteDto dto) {
        NoteBo noteBo = new NoteBo();
        noteBo.setId(dto.getId());
        noteBo.setTitle(dto.getTitle());
        noteBo.setArchived(dto.getArchived());
        if(dto.getTag() != null){
            Tag tag = new Tag(dto.getTag().getId(), dto.getTag().getName());
            noteBo.setTag(tag);
        }else{
            noteBo.setTag(null);
        }
        return noteBo;
    }
}

