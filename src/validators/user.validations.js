import z from "zod";

export const userValidationSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 8 characters." }),
  password: z.string().min(8, {
    message:
      "Password must be combination of uppercase, lowercase ,number and symbols.",
  }),
});
