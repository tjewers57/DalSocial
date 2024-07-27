package com.csci3130.group7.dalsocial.service.Implementation;

import com.csci3130.group7.dalsocial.model.Profile;
import com.csci3130.group7.dalsocial.model.ProfileStatus;
import com.csci3130.group7.dalsocial.model.User;
import com.csci3130.group7.dalsocial.model.ApprovalStatus;
import com.csci3130.group7.dalsocial.repository.ProfileRepository;
import com.csci3130.group7.dalsocial.repository.UserRepository;
import com.csci3130.group7.dalsocial.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utils.PasswordValidator;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final int MIN_EMAIL_LENGTH = 8;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public String createUser(User user) {
        if (user == null) { return "Error, user not saved"; }
        // dal email suffix is 7 chars long, username portion must be at least 1 char.
        if (user.getEmail().length() < 8 || !user.getEmail().endsWith("@dal.ca")) {
            return "Invalid email address, please enter a valid Dalhousie email address";
        }
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "An account with this email already exists";
        }
        if (!PasswordValidator.validatePassword(user.getPassword())) {
            return "Password does not meet all requirements";
        }
        Profile profile = new Profile("", "", ProfileStatus.STATUS_OFFLINE);
        user.setProfile(profile);
        // Set the user status to PENDING and approved to false
        user.setStatus(ApprovalStatus.PENDING);
        userRepository.save(user);
        return "User created successfully. Awaiting approval.";
    }

    @Override
    public List<User> fetchAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User findUserById(Integer id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()) {
            return optionalUser.get();
        } else{
            System.out.println("User not found with id: " + id);
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    @Override
    public List<User> findByFirstName(String firstName) {
        return userRepository.findByFirstName(firstName);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public String updateUser(User user) {
        Optional<User> optionalUser = userRepository.findById(user.getId());
        if(optionalUser.isPresent()) {
            if(!PasswordValidator.validatePassword(user.getPassword())){
                return "Password does not meet all requirements";
            }
            User user1 = optionalUser.get();
            user1.setFirstName(user.getFirstName());
            user1.setLastName(user.getLastName());
            user1.setEmail(user.getEmail());
            user1.setPassword(user.getPassword());
            user1.setRole(user.getRole());
            userRepository.save(user1);
            return "User successfully updated";
        } else {
            return "User not found with id: " + user.getId();
        }
    }

    @Override
    public String deleteUser(Integer id) {
        userRepository.deleteById(id);
        return "User deleted successfully";
    }

    @Override
    public String authenticateUser(String email, String password) {
        if(userRepository.findByEmail(email) == null) {
            return "An account with this email does not exist";
        }
        else if(!password.equals(userRepository.findByEmail(email).getPassword())) {
            return "Incorrect password";
        }else if (ApprovalStatus.PENDING.equals(userRepository.findByEmail(email).getStatus())) {
            return "Your account is in pending status";}
        else{
            return "User authenticated successfully";
        }
    }

    @Override
    public boolean correctAnswer(String email, String securityAnswer){
        if(userRepository.findByEmail(email) == null) {
            return false;
        }
        return securityAnswer.equals(userRepository.findByEmail(email).getSecurityAnswer());
    }

    @Override
    public List<User> fetchPendingUsers() {
        return userRepository.findByStatus(ApprovalStatus.PENDING);
    }
}
