package point.pulse.dev.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class EHR {
    @Id
    private Long id;
    private String name;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
