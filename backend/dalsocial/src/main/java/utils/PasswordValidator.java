package utils;

import java.util.Set;

/*
    This code was adapted from the Lab04 demo source code for the Summer 2024 section of CSCI3130.
 */

public class PasswordValidator {

    private static final int MIN_LENGTH = 8;

    public static boolean validatePassword(String password) {
        if(password == null || password.length() < MIN_LENGTH) {
            return false;
        }

        boolean uppercase = false;
        boolean lowercase = false;
        boolean number = false;
        boolean special = false;

        for(char c : password.toCharArray()) {
            if(Character.isUpperCase(c)) { uppercase = true; }
            if(Character.isLowerCase(c)) { lowercase = true; }
            if(Character.isDigit(c)) { number = true; }
            if(specialChar(c)) { special = true; }
        }

        return uppercase && lowercase && number && special;
    }

    private static boolean specialChar(char c) {
        Set<Character> specialCharacters = Set.of('!', '@', '#', '$',
                '%', '^', '&', '*',
                '(', ')', '-', '_',
                '+', '=', '{', '}',
                '[', ']', ':', ';',
                '<', '>', ',', '.',
                '?', '/', '\\', '|',
                '~', '`');

        return specialCharacters.contains(c);
    }
}
