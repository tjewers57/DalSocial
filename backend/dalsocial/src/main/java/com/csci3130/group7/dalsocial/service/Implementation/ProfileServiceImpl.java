package com.csci3130.group7.dalsocial.service.Implementation;

import com.csci3130.group7.dalsocial.model.Profile;
import com.csci3130.group7.dalsocial.model.User;
import com.csci3130.group7.dalsocial.service.ProfileService;
import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImpl implements ProfileService {


    @Override
    public String createProfile(Profile profile) {
        return "";
    }

    @Override
    public Profile findProfileById(Integer id) {
        return null;
    }

    @Override
    public Profile findProfileByUser(User user) {
        return null;
    }

    @Override
    public String updateProfile(Profile profile) {
        return "";
    }

    @Override
    public String deleteProfile(Integer id) {
        return "";
    }
}
