package point.pulse.dev.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import point.pulse.dev.model.User;
import point.pulse.dev.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User login(String username, String password) {
        Optional<User> tempUser = userRepository.findByUsernameAndPassword(username, password);

        return tempUser.orElse(null);
    }

}
