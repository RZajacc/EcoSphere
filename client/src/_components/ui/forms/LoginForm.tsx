"use client";
import React, { useContext } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { AuthContext } from "@/context/AuthContext";

import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import { login } from "../../../../lib/actions/login";
import FormErrors from "./FormErrors";

import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

function LoginForm({ children }: Props) {
  // Form management
  const [state, action] = useFormState(login, undefined);
  const { pending } = useFormStatus();

  // Context and router
  const { revalidateUser } = useContext(AuthContext);
  const router = useRouter();

  // If login was successfull revalidate and redirect
  if (state && state.success) {
    revalidateUser();
    router.push("/");
  }

  return (
    <form
      className="grid gap-2 rounded-lg border-2 border-teal-500 p-2 shadow-md shadow-teal-700"
      action={action}
    >
      {children}
      <FormInput
        name="email"
        required
        placeholder="type your email here"
        type="email"
      />
      <FormInput
        name="password"
        placeholder="type your password here"
        type="password"
      />
      {state && !state.success && <FormErrors errors={[state.msg]} />}
      <SubmitButton pending={pending} title="Log In" />
    </form>
  );
}

export default LoginForm;
