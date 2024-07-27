package com.csci3130.group7.dalsocial.service.Implementation;

import com.csci3130.group7.dalsocial.model.User;
import com.csci3130.group7.dalsocial.model.UserRole;
import com.csci3130.group7.dalsocial.model.ApprovalStatus;
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
    public String approveUser(int userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setStatus(ApprovalStatus.APPROVED);
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
