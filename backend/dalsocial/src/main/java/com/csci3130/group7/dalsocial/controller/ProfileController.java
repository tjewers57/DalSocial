package com.csci3130.group7.dalsocial.controller;

import com.csci3130.group7.dalsocial.model.Profile;
import com.csci3130.group7.dalsocial.model.User;
import com.csci3130.group7.dalsocial.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profiles")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PostMapping("/save")
    public String save(@RequestBody Profile profile) {
        return profileService.createProfile(profile);
    }

    @GetMapping("/get/{id}")
    public Profile getProfileById(@PathVariable int id) {
        return profileService.findProfileById(id);
    }

    @GetMapping("/getbyuser/{id}")
    public Profile getProfileByUser(@PathVariable int id) {
        return profileService.findProfileByUser(id);
    }

    @PutMapping("/update")
    public String update(@RequestBody Profile profile) {
        return profileService.updateProfile(profile);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable int id) {
        return profileService.deleteProfile(id);
    }
}
