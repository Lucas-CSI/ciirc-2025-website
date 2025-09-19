package point.pulse.dev.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import point.pulse.dev.model.EHR;
import point.pulse.dev.repository.EHRRepository;

import java.util.List;

@Service
public class EHRService {
    @Autowired
    private EHRRepository ehrRepository;

    public List<EHR> findEHRByName(String name) {
        return ehrRepository.findByName(name);
    }

    public List<EHR> getFirst50Records(){
        return ehrRepository.getFirst50Records();
    }
}
