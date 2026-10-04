import { z } from "zod";

export const RoleEnum = z.enum(["CUSTOMER", "STAFF", "DRIVER", "ADMIN"]);
export type RoleType = z.infer<typeof RoleEnum>;

export const loginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: RoleEnum.default("CUSTOMER"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
