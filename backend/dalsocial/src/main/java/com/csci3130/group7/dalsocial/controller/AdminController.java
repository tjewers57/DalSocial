package com.csci3130.group7.dalsocial.controller;





import com.csci3130.group7.dalsocial.model.User;
import com.csci3130.group7.dalsocial.service.AdminService;
import com.csci3130.group7.dalsocial.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import utils.LoginInfo;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {

    @Autowired
    AdminService adminService;

    @PutMapping("/changeRole/{userId}")
    public String updateUserRole(@PathVariable int userId) {
        return adminService.updateUserRolebyId(userId);
    }

//Admin
@PutMapping("/approveUser/{userId}")
public String approveUser(@PathVariable int userId) {
    return adminService.approveUser(userId);
}

    @PutMapping("/rejectUser/{userId}")
    public String rejectUser(@PathVariable int userId) {
        return adminService.rejectUser(userId);
    }

}
