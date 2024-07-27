package com.csci3130.group7.dalsocial;

import com.csci3130.group7.dalsocial.model.Profile;
import com.csci3130.group7.dalsocial.model.User;
import com.csci3130.group7.dalsocial.repository.ProfileRepository;
import com.csci3130.group7.dalsocial.service.Implementation.ProfileServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProfileServiceTests {

    @Mock
    private ProfileRepository profileRepository;

    @InjectMocks
    private ProfileServiceImpl profileService;

    @Before()
    public void setup(){
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void createReturnsErrorWhenProfileIsNull(){
        Assertions.assertEquals("Error, profile not saved.", profileService.createProfile(null));
    }

    @Test
    public void createReturnsErrorWhenUserIsNull(){
        Profile profile = new Profile();
        profile.setUser(null);
        Assertions.assertEquals("Error, profile not saved.", profileService.createProfile(profile));
    }

    @Test
    public void createSavesProfile(){
        Profile profile = new Profile();
        profile.setUser(new User());
        when(profileRepository.save(profile)).thenReturn(profile);
        Assertions.assertEquals("Profile saved successfully!", profileService.createProfile(profile));
    }

    @Test (expected = RuntimeException.class)
    public void findByIdThrowsExceptionWhenProfileDoesntExist(){
        int id = anyInt();
        when(profileRepository.findById(id)).thenReturn(null);
        profileService.findProfileById(id);
    }

    @Test
    public void findByIdReturnsProfile(){
        int id = anyInt();
        Profile profile = new Profile();
        profile.setUser(new User());
        when(profileRepository.findById(id)).thenReturn(Optional.of(profile));
        Assertions.assertEquals(profile, profileService.findProfileById(id));
    }

    @Test
    public void findByUserReturnsNullWhenUserDoesntExist(){
        Profile profile = new Profile();
        when(profileRepository.findByUserId(anyInt())).thenReturn(null);
        Assertions.assertNull(profileService.findProfileByUser(null));
    }

    @Test
    public void findByUserReturnsProfile(){
        Profile profile = new Profile();
        profile.setUser(new User());
        int id = anyInt();
        when(profileRepository.findByUserId(id)).thenReturn(profile);
        Assertions.assertEquals(profile, profileService.findProfileByUser(id));

    }

    @Test
    public void updateReturnsErrorWhenProfileDoesntExist(){
        int id = anyInt();
        Profile profile = new Profile();
        profile.setId(id);
        when(profileRepository.findById(id)).thenReturn(Optional.empty());
        Assertions.assertEquals("Profile not found with id: " + profile.getId(), profileService.updateProfile(profile));
    }

    @Test
    public void updateUpdatesProfile(){
        Profile profile = new Profile();
        profile.setId(anyInt());
        when(profileRepository.findById(profile.getId())).thenReturn(Optional.of(profile));
        Assertions.assertEquals("Profile updated successfully", profileService.updateProfile(profile));

    }

    @Test
    public void deleteDeletesProfile(){
        Assertions.assertEquals("Profile deleted successfully", profileService.deleteProfile(anyInt()));
    }
}
