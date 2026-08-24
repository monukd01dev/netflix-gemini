import { z } from 'zod';
import { VALIDATION_ERRORS } from './errorCode';

// Mononym safe, Unicode friendly, ReDoS immune name validator
export const namePrimitive = z.string({ required_error: VALIDATION_ERRORS.NAME_REQUIRED })
    .min(2, VALIDATION_ERRORS.NAME_TOO_SHORT)
    .max(60, VALIDATION_ERRORS.NAME_TOO_LONG)
    .transform(val => val.trim())
    .refine(
        // Added the dot (\.) to the allowed middle characters
        // Added the dot (\.) to the allowed ending characters
        val => /^[\p{L}](?:[\p{L}'\s.-]*[\p{L}.])?$/u.test(val),
        VALIDATION_ERRORS.NAME_INVALID_FORMAT
    );

export const emailPrimitive = z.string({ required_error: VALIDATION_ERRORS.EMAIL_REQUIRED })
    .min(1, VALIDATION_ERRORS.EMAIL_REQUIRED)
    .email(VALIDATION_ERRORS.EMAIL_INVALID)
    .transform(val => val.trim().toLowerCase());

export const passwordPrimitive = z.string({ required_error: VALIDATION_ERRORS.PASSWORD_REQUIRED })
    .min(8, VALIDATION_ERRORS.PASSWORD_TOO_SHORT)
    .max(20, VALIDATION_ERRORS.PASSWORD_TOO_LONG)
    .refine(val => /[A-Z]/.test(val), VALIDATION_ERRORS.PASSWORD_NO_UPPER)
    .refine(val => /[a-z]/.test(val), VALIDATION_ERRORS.PASSWORD_NO_LOWER)
    .refine(val => /\d/.test(val), VALIDATION_ERRORS.PASSWORD_NO_NUMBER)
    .refine(val => /[@$!%*?&]/.test(val), VALIDATION_ERRORS.PASSWORD_NO_SPECIAL);

// for GeminiSearch 
//this only validate and sanitize the user Input but not the prompt Injection prompt Injection handled at the instruction level
export const searchPrimitive = z.string({required_error : VALIDATION_ERRORS.SEARCH_REQUIRED})
    .trim()
    .min(2,VALIDATION_ERRORS.SEARCH_TOO_SHORT)
    .max(300, VALIDATION_ERRORS.SEARCH_TOO_LONG)
    .refine(
        val => !/[<>{}]/.test(val), 
        VALIDATION_ERRORS.SEARCH_INVALID_CHARS
    )
    // Block hidden control characters (ASCII 0-31) except newline
    // The Ultimate Optimized & Secure Approach
.refine(
    val => !/[\x00-\x09\x0B-\x1F]/u.test(val),
    "Invalid characters detected."
);