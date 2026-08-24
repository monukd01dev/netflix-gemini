import {z} from 'zod';
import { searchPrimitive } from '../baseRules';

export const aiSearchSchema = z.object({
    searchQuery : searchPrimitive
})