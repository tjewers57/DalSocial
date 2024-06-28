package com.csci3130.group7.dalsocial.service.Implementation;

import com.csci3130.group7.dalsocial.model.Profile;
import com.csci3130.group7.dalsocial.model.User;
import com.csci3130.group7.dalsocial.repository.ProfileRepository;
import com.csci3130.group7.dalsocial.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public String createProfile(Profile profile) {
        if(profile == null) { return "Error, profile not saved."; }
        if(profile.getUser() == null) { return "Error, profile not saved."; }
        if(profile.getTitle() == null) {
            profile.setTitle("");
        }
        if(profile.getBio() == null) {
            profile.setBio("Nothing here right now!");
        }
        profileRepository.save(profile);
        return "Profile saved successfully!";
    }

    @Override
    public Profile findProfileById(Integer id) {
        Optional<Profile> optionalProfile = profileRepository.findById(id);
        if(optionalProfile.isPresent()) {
            return optionalProfile.get();
        } else{
            System.out.println("Profile not found with id: " + id);
            throw new RuntimeException("Profile not found with id: " + id);
        }
    }

    @Override
    public Profile findProfileByUser(Integer id) {
        return profileRepository.findByUserId(id);
    }

    @Override
    public String updateProfile(Profile profile) {
        Optional<Profile> optionalProfile = profileRepository.findById(profile.getId());
        if(optionalProfile.isPresent()) {
            Profile updatedProfile = optionalProfile.get();
            updatedProfile.setBio(profile.getBio());
            updatedProfile.setTitle(profile.getTitle());
            updatedProfile.setStatus(profile.getStatus());
            profileRepository.save(updatedProfile);
            return "Profile updated successfully";
        } else{
            return "Profile not found with id: " + profile.getId();
        }
    }

    @Override
    public String deleteProfile(Integer id) {
        profileRepository.deleteById(id);
        return "Profile deleted successfully";
    }
}
