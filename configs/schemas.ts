import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required',
    }),
    password: z.string().min(6, {
        message: 'Password requires at least 6 characters',
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Email is required',
    }),
    password: z.string().min(6, {
        message: 'Password requires at least 6 characters',
    }),
    name: z.string().min(6, {
        message: 'Name is required',
    }),
});
