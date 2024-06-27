package com.csci3130.group7.dalsocial.service;

import com.csci3130.group7.dalsocial.model.Profile;
import com.csci3130.group7.dalsocial.model.User;

public interface ProfileService {

    String createProfile(Profile profile);

    Profile findProfileById(Integer id);

    Profile findProfileByUser(Integer id);

    String updateProfile(Profile profile);

    String deleteProfile(Integer id);
}
