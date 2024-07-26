package com.csci3130.group7.dalsocial.service;

import com.csci3130.group7.dalsocial.model.User;

public interface AdminService {

    String approveUser(int userId);

    String rejectUser(int userId);
}
