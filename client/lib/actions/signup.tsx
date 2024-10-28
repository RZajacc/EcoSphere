import { SignupFormSchema, FormState } from "../definitions/SignupFormSchema";

export async function signup(state: FormState, formData: FormData) {
  console.log(formData);
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
}
