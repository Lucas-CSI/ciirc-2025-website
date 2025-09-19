package point.pulse.dev.controller;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import point.pulse.dev.model.User;
import point.pulse.dev.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        if(username == null || password == null) {
            return ResponseEntity.status(400).body("Invalid username or password");
        }

        User user = userService.login(username, password);

        if(user == null) {
            return ResponseEntity.status(400).body("Invalid username or password");
        }
        return ResponseEntity.ok("Login Successful");
    }
}
