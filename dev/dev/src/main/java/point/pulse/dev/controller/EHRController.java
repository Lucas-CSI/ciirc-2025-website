package point.pulse.dev.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import point.pulse.dev.model.EHR;
import point.pulse.dev.repository.EHRRepository;
import point.pulse.dev.service.EHRService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/records")
public class EHRController {
    @Autowired
    private EHRService ehrService;

    @GetMapping("/get")
    public List<EHR> getEHR(@RequestParam String name) {
        if(name == null || name.isEmpty())
            return ehrService.getFirst50Records();
        return ehrService.findEHRByName(name);
    }
}
