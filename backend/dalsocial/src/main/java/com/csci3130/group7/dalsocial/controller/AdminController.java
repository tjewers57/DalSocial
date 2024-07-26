package com.csci3130.group7.dalsocial.controller;

import com.csci3130.group7.dalsocial.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {

    @Autowired
    AdminService adminService;

    @PutMapping("/approveUser/{userId}")
    public String approveUser(@PathVariable int userId) {
        return adminService.approveUser(userId);
    }

    @PutMapping("/rejectUser/{userId}")
    public String rejectUser(@PathVariable int userId) {
        return adminService.rejectUser(userId);
    }
}
