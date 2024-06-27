package com.csci3130.group7.dalsocial.repository;

import com.csci3130.group7.dalsocial.model.Profile;
import com.csci3130.group7.dalsocial.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Integer> {

    Profile findByUserId(Integer id);

}
