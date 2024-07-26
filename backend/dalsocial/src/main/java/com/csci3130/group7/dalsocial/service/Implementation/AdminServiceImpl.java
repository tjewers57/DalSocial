package com.csci3130.group7.dalsocial.service.Implementation;

import com.csci3130.group7.dalsocial.model.User;
import com.csci3130.group7.dalsocial.model.UserRole;
import com.csci3130.group7.dalsocial.model.UserStatus;
import com.csci3130.group7.dalsocial.repository.AdminRepository;
import com.csci3130.group7.dalsocial.repository.UserRepository;
import com.csci3130.group7.dalsocial.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    UserRepository userRepository;


    @Override
    public String updateUserRolebyId(int userId) {

        User userRole = userRepository.findById(userId).orElse(null);

        if(userRole.getRole() != null){
            String adminRole= "ROLE_ADMIN";
              userRole.setRole(UserRole.valueOf(adminRole));
              userRepository.save(userRole);
            return "User role successfully updated";
        } else {

            return "User already have admin role" + userRole.getRole();
        }
    }

    //Admin
    @Override
    public String approveUser(int userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setStatus(UserStatus.APPROVED);
            user.setApproved(true); // Set approved to true
            userRepository.save(user);
            return "User approved successfully";
        } else {
            return "User not found";
        }
    }

    @Override
    public String rejectUser(int userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            userRepository.deleteById(userId);
            return "User rejected and deleted successfully";
        } else {
            return "User not found";
        }

    }
}
