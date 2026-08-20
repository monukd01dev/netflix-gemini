
import { userEntity } from './userEntity';

export const loginSchema = userEntity.omit({
    fullName:true,
})

export const registrationSchema = userEntity.pick({
    fullName:true,
    email:true,
    password:true
})