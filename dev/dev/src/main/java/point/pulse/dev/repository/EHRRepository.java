package point.pulse.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import point.pulse.dev.model.EHR;

import java.util.List;

public interface EHRRepository extends JpaRepository<EHR, Long> {
    @Query("SELECT ehr FROM EHR ehr WHERE LOWER(ehr.name) LIKE %?1%")
    List<EHR> findByName(String name);

    @Query("SELECT ehr FROM EHR ehr ORDER BY ehr.name DESC LIMIT 50")
    List<EHR> getFirst50Records();
}
