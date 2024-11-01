import { SignupFormSchema, FormState } from "../definitions/SignupFormSchema";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Signup logic
  const { name, email, password } = validatedFields.data;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("userName", name);
  urlencoded.append("email", email);
  urlencoded.append("password", password);

  const response = await fetch("http://localhost:5000/users/signup", {
    method: "PUT",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  });

  if (!response.ok) {
    const responsData: { msg: string } = await response.json();
    return responsData;
  } else {
    redirect("/login");
  }
}
