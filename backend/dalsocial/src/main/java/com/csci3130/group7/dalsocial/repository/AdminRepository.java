package com.csci3130.group7.dalsocial.repository;

import com.csci3130.group7.dalsocial.model.Friend;
import com.csci3130.group7.dalsocial.model.User;
import com.csci3130.group7.dalsocial.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<User, Integer> {




}
