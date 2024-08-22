package ar.ensolvers.infrastructure.output.entity;

import ar.ensolvers.domain.Note.NoteBo;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "note")
public class Note {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "archived", nullable = false)
    private Boolean archived;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;

    public Note(NoteBo note) {
        this.id = note.getId();
        this.title = note.getTitle();
        this.text = note.getText();
        this.archived = note.getArchived();
    }
}
