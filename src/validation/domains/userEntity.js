import { z } from 'zod';
import { namePrimitive, emailPrimitive, passwordPrimitive } from '../baseRules';

export const userEntity = z.object({
    fullName: namePrimitive,
    email: emailPrimitive,
    password: passwordPrimitive,
})