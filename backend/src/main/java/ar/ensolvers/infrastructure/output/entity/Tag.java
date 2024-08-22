package ar.ensolvers.infrastructure.output.entity;

import ar.ensolvers.domain.Note.NoteBo;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "tag")
public class Tag {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "tag")
    private Set<Note> notes = new HashSet<>();

    public Tag(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

}
