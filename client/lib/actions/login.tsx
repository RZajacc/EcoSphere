import { redirect } from "next/navigation";

type FormState = { msg: string } | undefined;

export const login = async (state: FormState, formData: FormData) => {
  //   User credentials
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Send request to the server
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("email", email);
  urlencoded.append("password", password);

  const response = await fetch("http://localhost:5000/users/login", {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
    credentials: "include",
  });

  if (!response.ok) {
    const responseData: { msg: string } = await response.json();
    return responseData;
  } else {
    redirect("/");
  }
};
