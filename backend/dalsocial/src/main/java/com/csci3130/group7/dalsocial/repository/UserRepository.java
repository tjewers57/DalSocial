package com.csci3130.group7.dalsocial.repository;

import com.csci3130.group7.dalsocial.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    List<User> findByFirstName(String firstName);

    User findByEmail(String email);
}
