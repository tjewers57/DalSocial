package com.csci3130.group7.dalsocial.service;

import com.csci3130.group7.dalsocial.model.User;

public interface AdminService {

    public String updateUserRolebyId(int id);
//admin
    String approveUser(int userId);
    String rejectUser(int userId);
}
